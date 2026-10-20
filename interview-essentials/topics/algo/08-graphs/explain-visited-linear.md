---
id: graph-explain-visited-linear
kind: explain
version: 1
level: 2
tags: [foundations, graphs, traversal, complexity]
requires:
  - graph-bfs-queue-chunk
  - graph-adjacency-list-vs-matrix
  - graph-degree-from-edge-list
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
  - https://doi.org/10.1137/0201010
elaborate: Where does the same visited-set idea keep one of your own tools from looping — a crawler, a garbage collector, a dependency resolver?
---

A colleague's graph walk hangs on some inputs. Explain the `visited`
record of a BFS or DFS to them, and what that record does to the cost
of a full walk, as you would in an interview.

---

- [ ] Without marks, a cycle (or the way back along any undirected edge) re-adds vertices forever
- [ ] A visited mark lets each vertex be processed once
- [ ] Example: on triangle 0–1–2, BFS from 0 marks 1 and 2 on push, so 1 skips both
- [ ] With adjacency lists: V vertex visits + 2E edge scans (undirected, the degree sum) = O(V + E)
- [ ] With a matrix each vertex scans a whole row of V cells, giving O(V²) whatever E is
