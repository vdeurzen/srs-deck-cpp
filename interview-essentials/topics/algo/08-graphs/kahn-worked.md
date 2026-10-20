---
id: graph-kahn-worked
kind: basic
version: 1
level: 1
tags: [graphs, topological-sort, worked-example]
requires:
  - graph-topo-order
  - linear-queue-adt
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
---

## Kahn's algorithm on 0→1, 0→2, 1→2. `indeg[v]` (in-degree) counts the edges into v not yet removed. Queue the vertices at 0; emit one, remove its out-edges, queue any vertex that drops to 0. Why is 2 not queued when 0 is emitted?

```
emit   removes      indeg[0 1 2]   queue after
—      —            0 1 2          0
0      0→1, 0→2     0 0 1          1
1      1→2          0 0 0          2
2      —            0 0 0          —
```

---

**2 had two incoming edges; emitting 0 removed only one of them.**

`indeg[2]` falls from 2 to 1, so 2 still waits on 1. A vertex is
queued only when its last incoming edge goes, so it always comes after
everything that points into it.
