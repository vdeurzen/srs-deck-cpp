---
id: graph-bellman-ford-rounds
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths]
requires:
  - graph-bellman-ford-worked
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
elaborate: When would you pick this O(V · E) loop over Dijkstra in an interview problem, and what would you say to justify it?
---

## Bellman-Ford *relaxes* every edge (u, v, w), in any order, V − 1 times: if `dist[u] + w < dist[v]`, set `dist[v] = dist[u] + w`. With negative edges but no cycle whose weights sum below 0, why is V − 1 rounds enough?

```
s →(2) a →(1) b →(−3) c        s →(1) c
V = 4: the best route to c, s→a→b→c = 0, uses 3 edges
```

---

**A cheapest path never repeats a vertex, so it has at most V − 1 edges.**

Round k settles every vertex whose cheapest path has k edges, in any
edge order. With no such cycle, going round a loop never makes a path
cheaper, so no cheapest path needs more than V − 1 edges. Cost: O(V · E).
