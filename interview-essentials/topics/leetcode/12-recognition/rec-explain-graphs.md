---
id: rec-explain-graphs
kind: explain
version: 2
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
elaborate: Cheapest Flights Within K Stops (LC 787) asks for the cheapest price from `src` to `dst` with at most `k` stops; prices are non-negative, yet plain Dijkstra on cities gives wrong answers. What has to go into the state?
---
An interviewer asks how you pick a shortest-path search from a problem
statement. Answer aloud.
---
- [ ] Cue: fewest steps or least total cost from a source; the cost of one move decides
- [ ] Pattern: every move costs 1, BFS; moves cost different non-negative amounts, Dijkstra with a heap
- [ ] Example: shortest clear path in a 0/1 grid, BFS with open cells as vertices
- [ ] Cost: BFS is O(V + E); Dijkstra with a binary heap is O(E log E)
- [ ] Look-alike: only "are these connected?" needs no distances: DFS, or union-find as edges arrive
