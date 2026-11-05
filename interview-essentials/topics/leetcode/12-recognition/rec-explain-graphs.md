---
id: rec-explain-graphs
kind: explain
version: 3
level: 4
tags: [graphs, recognition, lc-1091, lc-743]
requires:
  - rec-shortest-path-weights
  - gr-dijkstra-heap-parsons
  - gr-multi-source-bfs-code
  - rec-union-find-vs-dfs
refs:
  - https://leetcode.com/problems/shortest-path-in-binary-matrix/
  - https://leetcode.com/problems/network-delay-time/
  - https://leetcode.com/problems/number-of-provinces/
  - https://cp-algorithms.com/graph/breadth-first-search.html
  - https://cp-algorithms.com/graph/dijkstra_sparse.html
elaborate: Say aloud what must join the city in the search state when the cheapest flight route may make at most k stops.
---
An interviewer asks how you pick a shortest-path search from a problem
statement. Answer aloud.
---
- [ ] The statement asks for the fewest steps or least total cost from a source
- [ ] If every move costs 1, BFS; if moves cost different non-negative amounts, Dijkstra with a heap
- [ ] For the distance to the nearest of many sources, seed one BFS queue with all of them at 0
- [ ] A statement asking only "are these connected?" needs no distances: DFS, or union-find as edges arrive
- [ ] (empty: tick this)
