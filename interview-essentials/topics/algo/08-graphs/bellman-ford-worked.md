---
id: graph-bellman-ford-worked
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, worked-example]
requires:
  - graph-dijkstra-why-nonnegative
refs:
  - https://doi.org/10.1090/qam/102435
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---

## Bellman-Ford from s: each round *relaxes* every edge (u, v, w) in the listed order: if `dist[u] + w < dist[v]`, set `dist[v] = dist[u] + w`. Why does c drop to 0 only in round 3?

```
edges, in order: b→c −3, a→b 1, s→a 2, s→c 1    (∞ = not reached yet)

round   changes          dist s a b c
start   —                0 ∞ ∞ ∞
1       a = 2, c = 1     0 2 ∞ 1
2       b = 2 + 1 = 3    0 2 3 1
3       c = 3 − 3 = 0    0 2 3 0
```

---

**c's cheapest path, s → a → b → c, has 3 edges, settled one per round.**

b → c is checked first, so in rounds 1 and 2 it reads b before b has
its value. Round 1 settles a, round 2 b, round 3 c. A luckier edge order
finishes sooner; the round count covers the worst order.
