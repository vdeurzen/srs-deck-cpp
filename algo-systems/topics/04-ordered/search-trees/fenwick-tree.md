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
refs:
  - https://dl.acm.org/doi/10.1002/spe.4380240306
  - https://en.wikipedia.org/wiki/Fenwick_tree
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

`i & -i` isolates the **lowest set bit** — in two's complement, `-i` is
`~i + 1`, so every bit below the lowest set bit is flipped to 1 and
carried into it, and the AND keeps exactly that one bit. That value is
the *size of the range* the slot `t[i]` is responsible for: `t[6]`
(binary 110, low bit 2) covers two elements, `t[8]` covers eight.

The two loops are exact mirrors. `prefix` **removes** the low bit,
walking 7 → 6 → 4 → 0 and summing three disjoint ranges that tile
`[1, 7]`. `add` **adds** the low bit, walking 3 → 4 → 8, visiting every
slot whose range contains index 3. Both take at most one step per set
bit, so both are O(log n) with a tiny constant and no recursion.

What makes it worth knowing beyond competitive programming: it is a
`vector<long long>` — no pointers, no allocation per element, perfect
locality — and it supports *updates*, which a precomputed prefix-sum
array does not. That combination (point update, range sum) is how
databases maintain running aggregates and approximate quantile
sketches, and how schedulers keep weighted-random selection tables.

Its limits are worth stating too: it needs an invertible operation
(sums, xor — not max) and a fixed size. For range-update/range-query or
non-invertible operations, a segment tree is the structure, at roughly
twice the memory and a larger constant.
