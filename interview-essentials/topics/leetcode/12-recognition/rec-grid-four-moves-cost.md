---
id: rec-grid-four-moves-cost
kind: basic
version: 1
level: 4
tags: [grids, recognition]
requires:
  - rec-shortest-path-weights
  - dp-grid-dag-signal
  - graph-grid-as-graph
elaborate: If the same grid allowed only down and right moves, which approach would you switch to, and what would it save?
refs:
  - https://doi.org/10.1007/BF01386390
  - https://leetcode.com/problems/minimum-path-sum/
  - https://cp-algorithms.com/graph/dijkstra_sparse.html
---

> Given an `n × n` grid of costs `0 <= c <= 9`, `n <= 100`, return the
> least total cost of a path from the top-left to the bottom-right
> cell, stepping up, down, left or right.

## Which pattern applies?

---

**Dijkstra over the grid: cells are vertices, entering a cell costs its value.**

Four directions allow cycles, so no row-by-row table order exists: two
neighbours would each need the other first. Costs differ, so plain BFS
is out; non-negative costs make Dijkstra correct.
