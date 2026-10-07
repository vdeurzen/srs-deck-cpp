---
id: graph-topo-dfs-cycle
kind: basic
version: 1
level: 3
tags: [graphs, dfs, compilers]
requires:
  - algo-basics/graph-bfs-and-dfs
refs:
  - https://en.wikipedia.org/wiki/Topological_sorting#Depth-first_search
---

## A DFS-based topological sort records each vertex as it finishes, then reverses that order. How does it detect a cycle?

---

**An edge to a grey vertex — started, not finished, still on the stack — closes a cycle.**

Grey means an ancestor on the current path, so the edge is a back edge.
Edges to black (finished) vertices are forward or cross edges, which
are harmless. Two colours cannot tell these apart; the grey path is
the cycle to report.
