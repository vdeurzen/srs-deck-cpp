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
---

## Bellman-Ford relaxes *every* edge, in any order, V − 1 times, and negative edges are allowed. Why is V − 1 rounds enough?

```
s →(2) a →(1) b →(−3) c        s →(1) c
V = 4: the best route to c, s→a→b→c = 0, uses 3 edges
```

---

**A shortest path has at most V − 1 edges, and round k settles every k-edge path.**

Round k extends round k − 1's paths by one edge, in any edge order.
With no negative cycle, a shortest path never repeats a vertex, so it
has at most V − 1 edges. Cost: O(V · E).
