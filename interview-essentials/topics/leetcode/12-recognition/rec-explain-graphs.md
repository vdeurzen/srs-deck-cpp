---
id: rec-explain-graphs
kind: explain
version: 1
level: 4
tags: [graphs, shortest-paths, topological-sort, union-find, recognition, lc-127, lc-1368, lc-207]
requires:
  - rec-shortest-path-weights
  - gr-kahn-chunk
  - rec-union-find-vs-dfs
refs:
  - https://leetcode.com/problems/word-ladder/
  - https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/
  - https://leetcode.com/problems/network-delay-time/
  - https://leetcode.com/problems/course-schedule/
  - https://leetcode.com/problems/redundant-connection/
  - https://cp-algorithms.com/graph/01_bfs.html
elaborate: LC 787 (cheapest flight with at most k stops) has non-negative prices, yet plain Dijkstra on cities gives wrong answers. What has to go into the state?
---
For each statement, name the algorithm and the property that decides
it. (1) The fewest one-letter changes that turn `begin` into `end`,
every word on the way taken from a list. (2) Each grid cell's sign
points to a neighbour; changing a sign costs 1; the cheapest way to get
a path from corner to corner. (3) Travel times `0..100` on directed
links; how long until a signal from `k` reaches every node. (4) Whether
all courses can be taken, given `[course, prerequisite]` pairs.
(5) The extra edge to remove from a tree that had one edge added.
---
- [ ] (1) BFS over words: every change costs one step, so a word's first discovery is by the fewest changes
- [ ] (2) 0-1 BFS: following a sign costs 0 and changing it costs 1, so a deque keeps the frontier in distance order
- [ ] (3) Dijkstra: costs vary but are never negative, so a node popped from the heap is final
- [ ] (4) Kahn's topological sort: every course can be taken exactly when all of them reach in-degree 0; a cycle leaves some behind
- [ ] (5) Union-find over the edges in order: the first edge whose ends already share a root closes the cycle
