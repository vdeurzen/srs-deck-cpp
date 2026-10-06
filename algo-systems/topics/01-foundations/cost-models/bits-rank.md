---
id: foundations-bits-rank
kind: code
version: 1
level: 3
tags: [bit-tricks, succinct, tries]
requires:
  - foundations-bits-trace
input: chips
choices:
  c1: ["((1ULL << i) - 1)", "(1ULL << i)", "~(1ULL << i)", "((1ULL << (i + 1)) - 1)"]
compile:
  harness: |
    constexpr std::uint64_t kPresent = 0b1011'0100;   // slots 2, 4, 5, 7
    static_assert(rank(kPresent, 0) == 0);
    static_assert(rank(kPresent, 2) == 0);
    static_assert(rank(kPresent, 4) == 1);
    static_assert(rank(kPresent, 5) == 2);
    static_assert(rank(kPresent, 7) == 3);
    int main() {}
refs:
  - https://lampwww.epfl.ch/papers/idealhashtrees.pdf
  - https://en.cppreference.com/w/cpp/numeric/popcount
---

A compressed node stores only its present children, packed in slot
order, plus a 64-bit bitmap of which slots are present. Complete the
lookup of where slot `i`'s child sits in the packed array: the number of
present slots **below** `i`.

```cpp
#include <bit>
#include <cstdint>

constexpr int rank(std::uint64_t present, int i) {
  return std::popcount(present & {{c1::((1ULL << i) - 1)}});
}
```

---

`(1 << i) − 1` is a mask of the `i` bits below position `i`; popcount of
the masked bitmap is the child's index. One AND, one `popcnt`, no branch.

This is **rank**, the core operation of succinct structures, and the
trick that lets Bagwell's hash array mapped trie (the persistent map in
Clojure and Scala) store a 32- or 64-way node in exactly as many slots as
it has children. The `+ 1` variant counts slot `i` itself — an
off-by-one that sends every lookup one slot too far.
