---
id: graph-topological-order
kind: basic
version: 1
level: 3
tags: [graphs, scheduling, compilers, databases]
requires:
  - graph-bfs-and-dfs
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
---

## Kahn's algorithm topologically sorts a graph by repeatedly emitting a vertex of in-degree zero. How does it detect a cycle?

---

**It emits fewer than V vertices; the leftovers are the cycles and what depends on them.**

A vertex on a cycle always keeps an in-edge from another cycle vertex,
so its count never reaches zero. Detection costs nothing extra, and the
unemitted set is a usable error message.
