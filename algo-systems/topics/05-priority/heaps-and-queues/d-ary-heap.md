---
id: heap-d-ary
kind: basic
version: 2
level: 4
requires:
  - heap-vocabulary
  - foundations-cache-cost-model
tags: [heaps, memory-hierarchy, graphs]
elaborate: Your heap holds 64-byte structs instead of 8-byte keys. What happens to the cache argument for d = 4, and what would you store in the heap instead?
refs:
  - https://doi.org/10.1145/235141.235145
  - https://en.wikipedia.org/wiki/D-ary_heap
---

## When is a 4-ary heap faster than a binary one?

---

**When pushes outnumber pops and the children of a node share a cache line.**

Depth is log₄ n, half a binary heap's, so sift-up gets cheaper while
sift-down pays four comparisons per level instead of two. Dijkstra
pushes far more than it pops, and four aligned 8-byte siblings share one
cache line, so a level still costs one miss.
