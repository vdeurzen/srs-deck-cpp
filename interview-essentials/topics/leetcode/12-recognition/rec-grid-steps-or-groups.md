---
id: rec-grid-steps-or-groups
kind: basic
version: 1
level: 3
tags: [graphs, grids, recognition, lc-200, lc-1926]
requires:
  - graph-bfs-why-shortest
  - graph-bfs-and-dfs
refs:
  - https://leetcode.com/problems/number-of-islands/
  - https://leetcode.com/problems/nearest-exit-from-entrance-in-maze/
elaborate: Where outside grids would "the first path found" and "the shortest path" differ, such as hops between services in a call graph?
---

Two grid statements, each grid at most 100 × 100, moves up, down, left
or right:

> (a) Given a grid of `'1'` (land) and `'0'` (water), return the number
> of islands: groups of land cells joined to each other.
>
> (b) Given a maze of `'.'` (open) and `'+'` (wall) cells and an
> entrance, return the fewest steps to the nearest exit (an open
> border cell other than the entrance), or −1 if there is none.

## A recursive depth-first search is the shortest code to write for both. Which one does it get wrong?

---

**(b): DFS reaches an exit along some path, not necessarily the shortest one.**

Fewest steps needs BFS: its queue holds cells in order of distance, so
the first exit it pops is the nearest. (a) only needs every land cell
marked once, which any traversal does.
