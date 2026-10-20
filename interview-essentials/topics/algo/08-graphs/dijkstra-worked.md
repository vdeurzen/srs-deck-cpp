---
id: graph-dijkstra-worked
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, worked-example]
requires:
  - graph-bfs-why-shortest
refs:
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
---

## Dijkstra on directed edges with non-negative lengths: pop the unpopped vertex with the smallest `dist`, then for each edge u → v of length w set `dist[v] = min(dist[v], dist[u] + w)`. Why does b pop at 3, not at the 4 that s offered?

```
edges: s→a 1, s→b 4, a→b 2, b→t 1      (∞ = not reached yet)

pop (dist)   updates             dist s a b t
s (0)        a = 1, b = 4        0 1 4 ∞
a (1)        b = 1 + 2 = 3       0 1 3 ∞
b (3)        t = 3 + 1 = 4       0 1 3 4
t (4)        —                   0 1 3 4
```

---

**a's 1 was smaller than b's 4, so a popped first and lowered b.**

A waiting vertex's `dist` can only drop. Popping the smallest first
lets every cheaper vertex offer its routes before a costlier one pops:
a's edge gave b the shorter route s → a → b.
