---
id: graph-bellman-ford-rounds
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths]
requires:
  - graph-dijkstra-why-nonnegative
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
elaborate: Run one extra round and some distance still drops. Say aloud what that proves about the graph, and where currency rates turn this into a real check.
---

## Bellman-Ford *relaxes* every edge (u, v, w), in any order, V − 1 times: if `dist[u] + w < dist[v]`, set `dist[v] = dist[u] + w`. With negative edges but no cycle whose weights sum below 0, why is V − 1 rounds enough?

```
s →(2) a →(1) b →(−3) c        s →(1) c
V = 4: the best route to c, s→a→b→c = 0, uses 3 edges
```

---

**Round k settles every shortest path of k edges; none needs more than V − 1.**

Round k extends round k − 1's paths by one edge, in any edge order.
With no such cycle, a shortest path never repeats a vertex, so it
has at most V − 1 edges. Cost: O(V · E).
