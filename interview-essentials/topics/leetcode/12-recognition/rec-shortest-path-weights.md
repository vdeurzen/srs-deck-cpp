---
id: rec-shortest-path-weights
kind: basic
version: 4
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

A grid is a graph: each cell is a vertex joined to the neighbours it
may step to.

> (a) Return the length of the shortest clear path from the top-left to
> the bottom-right cell; you step to any of the 8 neighbouring `0` cells.
>
> (b) `times[i] = (u, v, w)`, `0 <= w <= 100`, is a signal's travel time.
> Return how long until every node has received it.

## A plain BFS with a FIFO queue answers only one of them. What about the other rules it out?

---

**(b)'s moves cost different amounts, so queue order is no longer distance order.**

In (a) every step costs 1, so BFS pops cells in distance order and the
first arrival is shortest. (b) needs Dijkstra: a heap picks the nearest
vertex, and non-negative costs make a popped distance final.
