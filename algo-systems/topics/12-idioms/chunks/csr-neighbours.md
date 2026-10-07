---
id: chunks-csr-neighbours
kind: chunk
version: 1
level: 3
tags: [idioms, graphs, layout]
expose_ms: 6000
compile:
  harness: |
    struct Csr {                // 0->1 (4), 0->2 (1), 1->3 (5), 2->1 (2), 2->3 (8)
      unsigned offset[5]{0, 2, 3, 5, 5};
      unsigned target[5]{1, 2, 3, 1, 3};
      int weight[5]{4, 1, 5, 2, 8};
    };
    constexpr bool dijkstra_order() {
      Csr g;
      int dist[4]{0, 100, 100, 100};
      relax_out(g, dist, 0);    // settle in order 0, 2, 1
      relax_out(g, dist, 2);
      relax_out(g, dist, 1);
      return dist[1] == 3 && dist[2] == 1 && dist[3] == 8;
    }
    static_assert(dijkstra_order());
    int main() {}
requires:
  - graph-representations
refs:
  - https://en.wikipedia.org/wiki/Sparse_matrix#Compressed_sparse_row_(CSR,_CRS_or_Yale_format)
  - https://en.algorithmica.org/hpc/cpu-cache/
---

```cpp
constexpr void relax_out(const auto& g, int* dist, unsigned u) {
  for (unsigned e = g.offset[u]; e < g.offset[u + 1]; ++e) {
    const unsigned v = g.target[e];
    if (dist[v] > dist[u] + g.weight[e]) dist[v] = dist[u] + g.weight[e];
  }
}
```

---

Walking one vertex's out-edges in **compressed sparse row** form:
`offset` has V + 1 entries and `target` E, with edge data in parallel
arrays indexed by the same `e`. The neighbours of `u` are one contiguous
span, so the loop streams and prefetches; the extra `offset[V]` entry
is why the last vertex needs no special case.

This is the shape of every traversal over a frozen graph: BFS,
Dijkstra, PageRank, dataflow over a CFG. Compile-checked: the harness
runs Dijkstra's relaxations over a five-edge graph.
