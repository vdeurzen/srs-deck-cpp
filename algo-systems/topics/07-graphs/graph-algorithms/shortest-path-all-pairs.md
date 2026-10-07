---
id: graph-shortest-path-all-pairs
kind: cloze
version: 1
level: 4
tags: [graphs, shortest-paths]
requires:
  - graph-johnson-reweighting
refs:
  - https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
  - https://doi.org/10.1145/321992.321993
---

All-pairs shortest paths. Dense graph:
{{c1::Floyd-Warshall::a 300-city distance table}}, O(V³) as three
nested loops over a matrix. Sparse graph with negative edges:
{{c2::Johnson's algorithm::a million-node road graph with toll
rebates}}, one Bellman–Ford pass then a Dijkstra per source.
