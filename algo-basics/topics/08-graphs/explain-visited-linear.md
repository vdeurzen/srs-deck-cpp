---
id: graph-explain-visited-linear
kind: explain
version: 1
level: 2
tags: [foundations, graphs, traversal, complexity]
requires:
  - graph-no-visited-loop-trace
  - graph-traversal-work-trace
  - graph-bfs-queue-chunk
  - graph-matrix-from-edges
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
  - https://doi.org/10.1137/0201010
---

A colleague's graph walk hangs on some inputs. Explain to them what a
`visited` record does for a BFS or DFS, and where the O(V + E) running
time comes from.

---

- [ ] Without marks, a cycle (or the way back along any undirected edge) re-adds vertices forever
- [ ] A visited mark lets each vertex be processed once; set on the push (as BFS does), it also enters the queue only once
- [ ] Each processed vertex scans its adjacency list once: the scans total the degree sum, 2E
- [ ] With adjacency lists the total is V + 2E steps: O(V + E)
- [ ] With a matrix each vertex scans a whole row of V cells, giving O(V²) whatever E is
