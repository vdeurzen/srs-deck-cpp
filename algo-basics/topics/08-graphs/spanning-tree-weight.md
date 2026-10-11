---
id: graph-spanning-tree-weight
kind: basic
version: 2
level: 1
tags: [foundations, graphs, trees, weighted]
requires:
  - graph-spanning-tree-def
refs:
  - https://en.wikipedia.org/wiki/Spanning_tree
  - https://en.wikipedia.org/wiki/Glossary_of_graph_theory#weighted_graph
elaborate: If the numbers were cable lengths between offices, what would the lighter tree save you?
---

## In this weighted graph each edge carries a cost. Which spanning tree is cheaper: T1 = A–D, A–C, B–C or T2 = A–B, B–C, C–D?

```
A ──4── B
│ ╲     │
1   2   3
│     ╲ │
D ──5── C
```

---

**T1: it weighs 1 + 2 + 3 = 6; T2 weighs 4 + 3 + 5 = 12.**

A weighted graph attaches a number to each edge; a subgraph's weight
is the sum over the edges it keeps. Both trees reach all four vertices
with three edges, so only the weights tell them apart.
