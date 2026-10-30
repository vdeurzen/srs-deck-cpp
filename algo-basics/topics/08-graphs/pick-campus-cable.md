---
id: graph-pick-campus-cable
kind: basic
version: 1
level: 3
tags: [graphs, mixed]
requires:
  - graph-kruskal-vs-prim
  - graph-spanning-tree-weight
  - interview-essentials/graph-dijkstra-popped-final
elaborate: Where in your own work would "connect everything as cheaply as possible" hide this same problem, such as linking servers or offices?
refs:
  - https://doi.org/10.1090/S0002-9939-1956-0078686-7
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
---

## 30 campus buildings must all be linked by cable, directly or through other buildings, using the least total cable; 200 possible runs and their lengths are given. Which algorithm would you use?

---

**A minimum spanning tree, built with Kruskal's or Prim's algorithm.**

The cost is the sum over every run laid, and a tree joins all
buildings without wasting cable on a cycle. Dijkstra minimises each
route from one building instead; those routes together can use more
cable.
