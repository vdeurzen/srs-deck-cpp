---
id: foundations-growth-below-two
kind: basic
version: 1
level: 4
requires:
  - foundations-growth-factor
tags: [amortised, sequences, allocators]
elaborate: If you know `n` in advance, which of these questions does `reserve(n)` make irrelevant?
refs:
  - https://github.com/facebook/folly/blob/main/folly/docs/FBVector.md
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---

## libstdc++ doubles a full `std::vector`; `folly::fbvector` grows by 1.5. If the allocator coalesces freed blocks, what does a factor below 2 let it do?

---

**Reuse the blocks the vector already freed for a later growth.**
With doubling, the freed blocks sum to `1 + 2 + … + 2^(k−1) = 2^k − 1`,
always smaller than the next request `2^k`, so the array creeps through
fresh memory. Below φ ≈ 1.618, coalesced old blocks eventually fit;
at 1.5, after four reallocations.
