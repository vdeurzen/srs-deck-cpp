---
id: ordered-eytzinger-layout
kind: basic
version: 1
level: 5
tags: [binary-search, memory-hierarchy, layout]
requires:
  - ordered-lower-bound-loop
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/data-structures/binary-search/
  - https://arxiv.org/abs/1509.05053
---

## Keys stored in Eytzinger (breadth-first) order: root at index 1, children of `k` at `2k` and `2k + 1`. Why is binary search faster here than on the sorted array?

---

**The hot top levels are packed into a few cache lines that stay resident.**

A sorted array's search probes n/2, n/4, 3n/4: one distant line each.
In BFS order the first levels are the first entries, and a node's
descendants several levels down are adjacent, so one prefetch covers
them.
