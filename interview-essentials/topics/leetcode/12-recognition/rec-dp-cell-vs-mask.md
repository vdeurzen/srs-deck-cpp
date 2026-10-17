---
id: rec-dp-cell-vs-mask
kind: basic
version: 1
level: 4
tags: [dynamic-programming, bitmask-dp, grids, recognition, lc-64, lc-847]
requires:
  - dp-grid-dag-signal
  - dp-bitmask-signal
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/shortest-path-visiting-all-nodes/
  - https://leetcode.com/problems/unique-paths-iii/
  - https://doi.org/10.1137/0110015
elaborate: Unique Paths III (LC 980) counts the walks from the start cell to the end cell that move in all four directions and cover every empty cell exactly once. Which of the two is it?
---

Two cheapest-route statements:

> (a) In an `m x n` grid of non-negative numbers, find the path from
> top left to bottom right with the smallest sum; you move only down or
> right.
>
> (b) Return the length of the shortest path that visits every node of
> a graph; you may start and stop anywhere and revisit nodes. `n <= 12`.

## In one of them the current position alone is not enough state. What about its goal decides that?

---

**(b) must cover every node, so the rest of the walk depends on which nodes are done.**

Two walks at the same node can owe different work, so (b)'s state is
(visited mask, node). In (a) moves never revisit a cell and the goal is
fixed, so a cell's best finish is the same however you arrived.
