---
id: foundations-growth-below-two
kind: basic
version: 1
level: 4
requires:
  - foundations-growth-factor
tags: [amortised, sequences, allocators]
elaborate: If you know `n` in advance, which cost does `reserve(n)` remove — the copying, the fragmentation, or both?
refs:
  - https://github.com/facebook/folly/blob/main/folly/docs/FBVector.md
  - https://en.cppreference.com/w/cpp/container/vector/reserve
---

## libstdc++ doubles a full `std::vector`; `folly::fbvector` grows by 1.5. What can the allocator do for a vector growing by less than 2 that it can never do under doubling?

---

**Reuse the blocks the vector already freed for a later growth.**
Doubling from `2^(k−1)` to `2^k` slots, the freed blocks sum to
`2^(k−1) − 1`: less than the live block, far less than the request. So
the array creeps through fresh memory. Below φ ≈ 1.618 the coalesced old
blocks eventually fit; at 1.5, after four reallocations.
