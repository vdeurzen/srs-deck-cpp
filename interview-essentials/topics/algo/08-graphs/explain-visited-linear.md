---
id: graph-explain-visited-linear
kind: explain
version: 1
level: 2
tags: [foundations, graphs, traversal, complexity]
requires:
  - graph-bfs-queue-chunk
  - graph-adjacency-list-vs-matrix
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
  - https://doi.org/10.1137/0201010
---

A colleague's graph walk hangs on some inputs. Explain to them what a
`visited` record does for a BFS or DFS, and where the O(V + E) running
time comes from.

---

- [ ] Without marks, a cycle (or the way back along any undirected edge) re-adds vertices forever
- [ ] A visited mark lets each vertex be processed once
- [ ] Set on the push (as BFS does), the mark lets a vertex enter the queue only once
- [ ] With adjacency lists: V vertex visits + 2E edge scans (undirected, the degree sum) = O(V + E)
- [ ] With a matrix each vertex scans a whole row of V cells, giving O(V²) whatever E is
