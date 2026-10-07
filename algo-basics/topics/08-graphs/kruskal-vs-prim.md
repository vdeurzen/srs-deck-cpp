---
id: graph-kruskal-vs-prim
kind: basic
version: 1
level: 3
tags: [graphs, mst, judgement]
requires:
  - graph-kruskal-code
  - graph-prim-heap-trace
refs:
  - https://doi.org/10.1090/S0002-9939-1956-0078686-7
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
elaborate: Your graph arrives as a CSV of (u, v, weight) rows. Which one is less code, and why?
---

## Kruskal and Prim both find a minimum spanning tree. What does each one grow, step by step?

```
Kruskal: 0-1 (1), 1-2 (2), 2-3 (4): a forest that merges
Prim from 0: 0, +1, +2, +3: one tree that grows
```

---

**Kruskal grows a forest edge by edge (union-find); Prim grows one tree vertex by vertex (heap).**

Kruskal sorts all edges, O(E log E), and suits an edge list. Prim needs
adjacency; with a heap O(E log V), or O(V²) with a plain array scan on
a dense matrix. Both apply the cut property each step.
