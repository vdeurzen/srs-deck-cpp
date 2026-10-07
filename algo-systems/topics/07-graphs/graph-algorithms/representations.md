---
id: graph-representations
kind: basic
version: 1
level: 3
tags: [graphs, layout, memory-hierarchy, compilers]
refs:
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
  - https://en.algorithmica.org/hpc/cpu-cache/
---

## Adjacency matrix, vector-of-vectors, or CSR: which does a compiler or graph engine use for a graph it traverses far more than it mutates?

---

**CSR: `offset[V+1]` and `target[E]`; each vertex's neighbours are one contiguous run.**

Two allocations, sequential prefetchable iteration, 4 bytes per edge
with 32-bit ids; edge data sits in parallel arrays (`weight[e]`).
Vector-of-vectors costs V allocations, a pointer chase per vertex and a
24-byte header each. A matrix costs V² whatever E is.
