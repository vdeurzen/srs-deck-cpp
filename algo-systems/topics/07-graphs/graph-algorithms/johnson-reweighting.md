---
id: graph-johnson-reweighting
kind: basic
version: 1
level: 5
tags: [graphs, shortest-paths]
requires:
  - graph-bellman-ford
refs:
  - https://doi.org/10.1145/321992.321993
  - https://en.wikipedia.org/wiki/Johnson%27s_algorithm
---

## Johnson's algorithm replaces each weight with `w(u,v) + h(u) − h(v)`, `h` from one Bellman–Ford run, then runs Dijkstra. Why are shortest paths unchanged?

---

**Along any s→t path the `h` terms telescope: every path shifts by h(s) − h(t).**

All s→t paths move by the same constant, so their ranking is kept.
With `h` the Bellman–Ford distances from a virtual source,
`h(v) ≤ h(u) + w(u,v)`, so every new weight is ≥ 0 and Dijkstra is
safe. A\*'s consistent heuristic is the same transform.
