---
id: rec-shortest-path-weights
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths, recognition, lc-1091, lc-2290, lc-743]
requires:
  - graph-bfs-why-shortest
  - graph-dijkstra-why-nonnegative
refs:
  - https://leetcode.com/problems/shortest-path-in-binary-matrix/
  - https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/
  - https://leetcode.com/problems/network-delay-time/
  - https://leetcode.com/problems/minimum-cost-to-make-at-least-one-valid-path-in-a-grid/
  - https://cp-algorithms.com/graph/01_bfs.html
elaborate: Minimum Cost to Make at Least One Valid Path in a Grid (LC 1368) asks for the cheapest way from top-left to bottom-right when you may follow a cell's arrow or pay 1 to change it. Which of the three is it, and what is the cost of each move?
---

Three shortest-route statements:

> (a) Return the length of the shortest clear path from the top-left to
> the bottom-right cell; you step to any of the 8 neighbouring `0` cells.
>
> (b) In a grid of `0` (empty) and `1` (obstacle) cells, moving up,
> down, left or right, return the minimum number of obstacles to remove
> so you can walk from the top-left to the bottom-right cell.
>
> (c) `times[i] = (u, v, w)`, `0 <= w <= 100`, is a signal's travel time.
> Return how long until every node has received it.

## What one property of each statement picks the search?

---

**The cost of one move: always 1, only 0 or 1, or any w ≥ 0.**

(a) BFS; (b) 0-1 BFS, since an empty cell is free and an obstacle costs
one removal; (c) Dijkstra. Equal costs keep a plain queue in distance
order; costs of 0 and 1 only need a deque; arbitrary costs a heap.
