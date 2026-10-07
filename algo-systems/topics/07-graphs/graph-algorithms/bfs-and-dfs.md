---
id: graph-bfs-and-dfs
kind: basic
version: 1
level: 2
tags: [graphs, traversal]
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
  - https://en.wikipedia.org/wiki/Depth-first_search
elaborate: Which graph walk in your code base would break if its queue were swapped for a stack?
---

## BFS and DFS differ by one data structure. What does each one's *order* give you that the other's does not?

---

**BFS: vertices in nondecreasing distance. DFS: nested discovery/finish intervals.**

Queue versus stack. Distance order gives unweighted shortest paths and a
frontier processed level by level. DFS's nesting — a vertex's interval
contains exactly its descendants' — classifies edges as tree, back,
forward or cross: the bookkeeping behind cycle detection, topological
order and SCCs.
