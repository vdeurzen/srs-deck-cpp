---
id: rec-shortest-path-weights
kind: basic
version: 3
level: 3
tags: [graphs, recognition, lc-1091, lc-743]
requires:
  - graph-dijkstra-why-nonnegative
  - graph-bfs-why-shortest
refs:
  - https://leetcode.com/problems/shortest-path-in-binary-matrix/
  - https://leetcode.com/problems/network-delay-time/
elaborate: If every travel time in (b) were the same 5, which of the two searches would then be enough, and why?
---

Two shortest-route statements. A grid is a graph: each cell is a vertex
joined to the neighbours it may step to.

> (a) Return the length of the shortest clear path from the top-left to
> the bottom-right cell; you step to any of the 8 neighbouring `0` cells.
>
> (b) `times[i] = (u, v, w)`, `0 <= w <= 100`, is a signal's travel time.
> Return how long until every node has received it.

## Which search does each statement need?

---

**BFS for (a), Dijkstra for (b): one move costs 1 there, any w ≥ 0 here.**

(a) BFS: with equal costs a plain FIFO queue already pops vertices in
distance order. (b) Dijkstra: costs differ, so a heap must pick the
nearest vertex; non-negative costs make a popped distance final.
