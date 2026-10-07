---
id: graph-adjacency-matrix-when
kind: basic
version: 1
level: 3
tags: [graphs, bitsets, layout]
requires:
  - graph-representations
refs:
  - https://en.wikipedia.org/wiki/Adjacency_matrix
  - https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
---

## When is a bit-matrix the right representation for a graph, despite costing V² bits?

---

**Small or dense graphs: each row is a bitset, so neighbour-set operations are word-wide.**

Edge test is O(1); "neighbours of u ∪ neighbours of v" is an OR over
V/64 words; transitive closure is Warshall's triple loop over words.
On a sparse graph it loses: listing u's neighbours scans all V bits
for a handful of edges.
