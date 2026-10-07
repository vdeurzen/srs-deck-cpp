---
id: ordered-fenwick-vs-prefix-array
kind: basic
version: 1
level: 4
tags: [prefix-sums, databases]
requires:
  - ordered-fenwick-tree
elaborate: A Fenwick tree needs an invertible operation for range queries. What would you use for range minimum with updates?
refs:
  - https://dl.acm.org/doi/10.1002/spe.4380240306
---

## A precomputed prefix-sum array answers any prefix sum in O(1). When is a Fenwick tree's O(log n) the better choice?

---

**When values change: a Fenwick update is O(log n), a prefix array's O(n).**

Changing one value shifts every later prefix sum. The Fenwick tree keeps
both operations logarithmic in one flat array: no pointers, perfect
locality. That is the shape of running aggregates and weighted-random
selection tables.
