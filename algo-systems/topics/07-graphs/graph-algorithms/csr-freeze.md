---
id: graph-csr-freeze
kind: basic
version: 1
level: 3
tags: [graphs, layout, compilers]
requires:
  - graph-representations
refs:
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
---

## A compiler builds a CFG, then runs a dozen analyses over it. Why build it in a `vector<vector<int>>` first and convert to CSR afterwards?

---

**CSR is immutable in shape: one new edge shifts `target` and every later `offset`.**

So mutate in the cheap-to-grow form, freeze once, and run every
analysis on the flat arrays. Analyses that walk predecessors get the
transpose (`offset_in`, `target_in`) built in the same freeze, since
CSR only lists out-edges.
