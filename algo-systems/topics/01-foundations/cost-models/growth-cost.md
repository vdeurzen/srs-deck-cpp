---
id: foundations-growth-cost
kind: code
version: 1
level: 3
tags: [amortised, sequences, allocators]
requires:
  - foundations-growth-factor
input: chips
choices:
  c1:
    - "cap * num / den"
    - "cap + num"
    - "cap * num"
    - "cap / den * num"
compile:
  harness: |
    static_assert(total_moves(1024, 2, 1) == 1023);     // 1 + 2 + ... + 512
    static_assert(total_moves(1024, 3, 2) == 2137);     // 1.5x: about twice the moves
    static_assert(total_moves(4096, 3, 2) == 10797);
    static_assert(total_moves(4096, 2, 1, 4096) == 0);  // reserve(n) first
    int main() {}
refs:
  - https://epubs.siam.org/doi/10.1137/0606031
  - https://github.com/facebook/folly/blob/main/folly/docs/FBVector.md
---

`total_moves` simulates `n` pushes into a vector that grows by the
factor `num/den` when full, and counts the elements copied. Complete the
new capacity.

```cpp
#include <algorithm>

constexpr long total_moves(long n, long num, long den, long cap = 1) {
  long size = 0, moves = 0;
  while (size < n) {
    if (size == cap) {
      moves += size;                                  // copy into the new block
      cap = std::max(cap + 1, {{c1::cap * num / den}});
    }
    ++size;
  }
  return moves;
}
```

---

Multiply first, then divide: `cap / den * num` truncates before it
scales (1 / 2 · 3 is 0) and grows in uneven steps. `cap + num` is a
fixed step, and its moves are quadratic: 262 144 for 1 024 pushes, where
doubling makes 1 023 — fewer than one copy per push. Growing by 1.5
roughly doubles the copies; that is the price of reusable freed blocks.
`reserve(n)` removes every copy.

Values computed by running the function under GCC 16.2.
