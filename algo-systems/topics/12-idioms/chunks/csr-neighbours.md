---
id: chunks-csr-neighbours
kind: chunk
version: 1
level: 3
tags: [idioms, graphs, layout]
expose_ms: 5000
compile: null
requires:
  - graph-representations
refs:
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
  - https://en.algorithmica.org/hpc/
---

```cpp
for (std::uint32_t e = offset[u]; e < offset[u + 1]; ++e) {
  const std::uint32_t v = target[e];
  if (dist[v] > dist[u] + weight[e]) relax(v, e);
}
```

---

Iterating a vertex's neighbours in **compressed sparse row** form: two
flat arrays, `offset` of size V+1 and `target` of size E, with edge
properties in parallel arrays indexed by the same `e`. The neighbours of
`u` are one contiguous span, so the loop streams and prefetches; the
`offset[u + 1]` bound is why the array has one extra entry and no
special case for the last vertex.

This is the shape every graph traversal takes once the graph stops
being mutated — BFS, Dijkstra, PageRank, dataflow over a CFG — and it
is the reason production graph code builds into `vector<vector<int>>`
and then *freezes* to CSR before running anything.

Graded by whitespace-normalised equality (SPEC §4.7): the arrays and
`relax` belong to the enclosing algorithm.
