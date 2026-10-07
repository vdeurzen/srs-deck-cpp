---
id: db-hash-join-probe
kind: code
version: 1
level: 3
tags: [databases, joins, hashing]
input: chips
choices:
  c1: ["rows_with_key[k]", "rows_with_key[k] > 0", "1", "rows_with_key[k]--"]
compile:
  harness: |
    constexpr std::array<int, 3> customers{1, 1, 2};          // build
    constexpr std::array<int, 5> orders{1, 3, 1, 2, 2};       // probe
    constexpr Counts n = hash_join(customers, orders);
    static_assert(n.inserts == 3 && n.lookups == 5);
    static_assert(n.matches == 6);
    int main() {}
requires:
  - db-hash-join
refs:
  - https://15445.courses.cs.cmu.edu/
  - https://www.vldb.org/pvldb/vol7/p85-balkesen.pdf
elaborate: Which SQL construct does the `rows_with_key[k] > 0` version compute, and why does it never need more than one match per probe row?
---

The join keys are small integers, so the "hash table" is a direct-indexed
count of build rows per key. Complete the probe so `matches` counts the
join's output rows.

```cpp
#include <array>
struct Counts { int inserts, lookups, matches; };
template <std::size_t B, std::size_t P>
constexpr Counts hash_join(const std::array<int, B>& build, const std::array<int, P>& probe) {
  std::array<int, 16> rows_with_key{};
  Counts n{};
  for (int k : build) { ++rows_with_key[k]; ++n.inserts; }
  for (int k : probe) { ++n.lookups; n.matches += {{c1::rows_with_key[k]}}; }
  return n;
}
```

---

**A probe row joins with every build row of its key.** The two `1`s
probing a key held twice yield 2 + 2, the two `2`s 1 + 1: six rows, from
one insert per build row and one lookup per probe row. Counting 1 when
the key exists computes a semi-join (`EXISTS`); decrementing pairs rows
off one to one, which no SQL join does.
