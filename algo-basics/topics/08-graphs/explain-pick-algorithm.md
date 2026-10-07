---
id: graph-explain-pick-algorithm
kind: explain
version: 1
level: 3
tags: [graphs, judgement]
requires:
  - graph-bellman-ford-rounds
  - graph-topo-order
  - graph-mst-cut-property
refs:
  - https://doi.org/10.1007/BF01386390
  - https://doi.org/10.1090/qam/102435
  - https://doi.org/10.1145/368996.369025
  - https://doi.org/10.1090/S0002-9939-1956-0078686-7
---
For each job, name the graph algorithm you would use and the property
of the input that decides it. (1) Fewest hops between two users of a
social network. (2) Fastest drive between two cities, from travel times.
(3) Cheapest route through a toll network where some links pay you a
rebate. (4) An order to compile 300 modules that import each other.
(5) The least cable that connects every building on a campus.
---
- [ ] (1) BFS, because the edges are unweighted and the queue reaches vertices in hop order
- [ ] (2) Dijkstra, because travel times are never negative, so a popped vertex is final
- [ ] (3) Bellman-Ford, because a rebate is a negative edge, which breaks Dijkstra
- [ ] (4) Topological sort, because "imports" is a dependency order on a directed graph
- [ ] (5) A minimum spanning tree (Kruskal or Prim), because it minimises total cable, not any one route
