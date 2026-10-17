---
id: graph-dijkstra-popped-final
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, invariants]
requires:
  - graph-bfs-why-shortest
  - heap-min-comparator
refs:
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Proof_of_correctness
---

## Dijkstra always pops the unfinished vertex with the smallest tentative distance. With non-negative weights, why is that distance already final?

```
s →(1) a →(1) b          s →(3) b
pops: s 0, a 1, b 2      (the direct edge offers 3)
```

---

**Any other route must leave the finished vertices through a vertex at least as far, and edges only add.**

When `b` is popped at 2, every unfinished vertex is at ≥ 2. A route to
`b` through any of them costs at least 2 plus non-negative edges, so it
cannot beat 2. BFS is the all-weights-1 case.
