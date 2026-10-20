---
id: graph-spanning-tree-def
kind: basic
version: 1
level: 1
tags: [foundations, graphs, trees]
requires:
  - interview-essentials/graph-cycle-spot
  - graph-component-count
refs:
  - https://en.wikipedia.org/wiki/Spanning_tree
---

## Which of these edge sets is a spanning tree of the graph: (a) A–B, B–C, C–A; (b) A–B, A–D; (c) A–D, A–C, B–C?

```
A ─── B
│ ╲   │
│   ╲ │
D ─── C
```

---

**(c).**

A spanning tree keeps every vertex and just enough edges to be a tree:
connected, with no cycle. (c) reaches A, B, C, D with no loop. (a) is a
cycle and leaves D out; (b) never reaches C.
