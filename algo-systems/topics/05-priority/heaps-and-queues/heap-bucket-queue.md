---
id: heap-bucket-queue
kind: basic
version: 2
level: 4
requires:
  - heap-lazy-deletion
tags: [heaps, graphs, shortest-paths]
elaborate: Your edge weights are travel times in milliseconds up to an hour. Is C still small enough, and what would a radix heap (O(log C) amortised) change?
refs:
  - https://doi.org/10.1145/363269.363610
  - https://doi.org/10.1145/77600.77615
---

## Dijkstra's edge weights are integers in [0, C], C small, so Dial's algorithm replaces the heap with an array of buckets indexed by tentative distance. Why do C + 1 circular buckets suffice?

---

**Every pending distance lies in [d, d + C], where d is the last one popped.**

Popped distances never decrease, and a push is a popped distance plus
one edge of weight ≤ C. So a push is an O(1) append, and a pop scans
forward from a cursor that never moves back: O(E + V·C), no comparisons.
