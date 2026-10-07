---
id: graph-dijkstra-nonnegative
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths, misconception]
elaborate: Where might a negative weight sneak into a graph you work with — a cost model, a latency budget, a profit calculation?
requires:
  - algo-basics/graph-bfs-and-dfs
  - heap-vocabulary
refs:
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
  - https://doi.org/10.1007/BF01386390
---

## Dijkstra with a min-heap and a closed set settles each vertex when it is popped. This graph has one negative edge and no cycle at all. What distance does it report for `u`?

```text
s → u   weight  1
s → v   weight  2
v → u   weight −2
```

---

**1 — yet the path s → v → u costs 0.**

Settling `u` at 1 assumes longer paths never get cheaper; the −2 edge
breaks that. "No negative cycle" makes shortest paths *defined*, not
Dijkstra correct. The variant without a closed set (skip only stale
`d > dist[u]` entries) re-pushes `u` and recovers here, but can take
exponential time.
