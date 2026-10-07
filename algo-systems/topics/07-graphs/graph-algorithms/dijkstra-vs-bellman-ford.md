---
id: graph-dijkstra-vs-bellman-ford
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths, contrast]
requires:
  - graph-bellman-ford
refs:
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
---

## Dijkstra and Bellman–Ford both relax edges. What is the one property that decides which you may use?

---

**Whether any edge weight is negative.**

Dijkstra relaxes each vertex's edges once, in settled order, which is
valid only if paths never get shorter as they grow: O((V + E) log V).
Bellman–Ford relaxes every edge V − 1 times in any order: slower,
O(V·E), but correct with negative weights, and it detects negative
cycles.
