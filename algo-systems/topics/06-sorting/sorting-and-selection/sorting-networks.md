---
id: sort-networks
kind: basic
version: 1
level: 4
tags: [sorting, branchless, simd, low-latency]
requires:
  - foundations-branch-misprediction
elaborate: Where in a hot path of yours is something sorted whose size is fixed and small — order-book levels, a top-k buffer, candidate routes?
refs:
  - https://dl.acm.org/doi/10.1145/1468075.1468121
  - https://en.algorithmica.org/hpc/algorithms/sorting/
---

## At n = 8, a sorting network (a fixed list of compare-exchanges) does as many comparisons as insertion sort on typical input, or more. Why can it still win?

---

**No data-dependent branches: each compare-exchange is a min/max pair, so nothing mispredicts.**

Pairs in one layer are independent, so depth matters more than count:
Batcher's 8-input odd-even merge network is 19 compare-exchanges in 6 layers. With
vector min/max, one network sorts many columns at once (SIMD kernels).
