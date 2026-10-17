---
id: graph-dijkstra-why-nonnegative
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, misconception]
requires:
  - graph-dijkstra-popped-final
refs:
  - https://doi.org/10.1007/BF01386390
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
elaborate: Where might a negative weight sneak into a graph you work with — a refund, a rebate, a log of a rate?
---

## Dijkstra treats a vertex as final once it is popped with the smallest distance. With this one negative edge, what does it report for `u`?

```
s → u   weight  1
s → v   weight  2
v → u   weight −2
```

---

**1, but s → v → u costs 0.**

`u` is popped at 1. "Final" assumes any other route passes through
a vertex at distance ≥ 1 and only adds weight, so it costs at least 1.
A negative edge makes a longer route cheaper.
