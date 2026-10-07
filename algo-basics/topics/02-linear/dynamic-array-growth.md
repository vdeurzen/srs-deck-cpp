---
id: linear-dynamic-array-growth
kind: basic
version: 1
level: 2
tags: [arrays, dynamic-arrays, amortised]
requires:
  - linear-array-index-contiguity
  - complexity-doubling-copies
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (dynamic tables)
---

## A full dynamic array must allocate a bigger block and copy every element over. Why does it multiply its capacity (e.g. ×2) instead of adding a fixed 10 slots?

---

**Geometric growth makes copies rare, so `push_back` is amortised O(1).**

Doubling, n pushes copy at most 1 + 2 + 4 + … < 2n elements: constant
per push. Adding 10 copies 10 + 20 + 30 + … ≈ n²/20: every push pays
O(n). The copies happen at all because the elements must stay
contiguous.
