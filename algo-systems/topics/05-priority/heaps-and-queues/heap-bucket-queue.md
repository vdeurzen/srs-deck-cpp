---
id: heap-bucket-queue
kind: basic
version: 1
level: 4
requires:
  - heap-lazy-deletion
tags: [heaps, graphs, shortest-paths]
elaborate: Your edge weights are travel times in milliseconds up to an hour. Is C still small enough, and what would a radix heap (O(log C) amortised) change?
refs:
  - https://doi.org/10.1145/363269.363610
  - https://doi.org/10.1145/77600.77615
---

## Dijkstra's edge weights are integers in [0, C] with C small. What replaces the heap?

---

**A bucket queue: an array of lists indexed by tentative distance (Dial's algorithm).**

Every pending distance lies in [d, d + C], where d is the last one
popped, so C + 1 circular buckets suffice. Push is an O(1) append; pop
scans forward from the cursor, never backwards. Total O(E + V·C), no
comparisons at all.
