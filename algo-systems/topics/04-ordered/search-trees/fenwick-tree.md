---
id: ordered-fenwick-tree
kind: code
version: 1
level: 4
tags: [prefix-sums, bit-tricks, databases]
input: chips
choices:
  c1: ["i & -i", "1", "i & (i - 1)", "(i & -i) >> 1"]
compile:
  harness: |
    constexpr Fenwick build() {
      Fenwick f{};
      for (std::size_t i = 0; i < 8; ++i) f.add(i, static_cast<long long>(i) + 1);
      return f;
    }
    static_assert(build().prefix(0) == 0);
    static_assert(build().prefix(1) == 1);
    static_assert(build().prefix(3) == 6);   // 1+2+3, two slots read
    static_assert(build().prefix(4) == 10);  // 1+2+3+4
    static_assert(build().prefix(7) == 28);  // three slots read
    static_assert(build().prefix(8) == 36);  // 1..8
    int main() {}
requires:
  - foundations-bits-lowest-set-bit
  - algo-basics/linear-prefix-sum-range
refs:
  - https://dl.acm.org/doi/10.1002/spe.4380240306
---

A Fenwick tree answers prefix sums in O(log n) with one array and no
nodes. Complete the step that walks from an index to the next one whose
range covers it.

```cpp
#include <array>
#include <cstddef>

struct Fenwick {                      // 1-indexed internally; t[0] unused
  std::array<long long, 9> t{};       // eight values

  constexpr void add(std::size_t i, long long v) {
    for (++i; i < t.size(); i += {{c1::i & -i}}) t[i] += v;
  }

  constexpr long long prefix(std::size_t n) const {   // sum of [0, n)
    long long s = 0;
    for (std::size_t i = n; i > 0; i -= i & -i) s += t[i];
    return s;
  }
};
```

---

`i & -i` is the lowest set bit, and that is the length of the range slot
`t[i]` covers: `t[6]` (110) covers two elements, `t[8]` covers eight.
`prefix` *removes* the low bit (7 → 6 → 4 → 0), summing ranges that tile
`[1, 7]`; `add` *adds* it (3 → 4 → 8), visiting every slot whose range
contains 3. Each is one step per bit: O(log n).
