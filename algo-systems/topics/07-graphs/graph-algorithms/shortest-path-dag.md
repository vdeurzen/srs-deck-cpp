---
id: graph-shortest-path-dag
kind: cloze
version: 1
level: 4
tags: [graphs, shortest-paths, scheduling]
requires:
  - graph-topological-order
refs:
  - https://en.wikipedia.org/wiki/Shortest_path_problem#Directed_acyclic_graphs
---

On a DAG, with weights of any sign, single-source shortest paths need
no heap: relax each vertex's out-edges in
{{c1::topological order::the order a build system runs its jobs}},
O(V + E). Negate the weights and the same loop finds the longest path:
the critical path of a schedule.
