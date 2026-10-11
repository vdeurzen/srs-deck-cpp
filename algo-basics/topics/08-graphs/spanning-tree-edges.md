---
id: graph-spanning-tree-edges
kind: basic
version: 1
level: 2
tags: [foundations, graphs, trees]
requires:
  - graph-spanning-tree-def
  - graph-tree-edge-count
refs:
  - https://en.wikipedia.org/wiki/Spanning_tree
---

## A connected graph has 10 vertices and 30 edges. How many edges does each of its spanning trees keep?

---

**9, whichever spanning tree you pick.**

A spanning tree is a tree on all V = 10 vertices, and every tree on V
vertices has exactly V − 1 edges. The 30 edges only decide how many
different spanning trees exist, not their size.
