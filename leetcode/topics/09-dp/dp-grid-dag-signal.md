---
id: dp-grid-dag-signal
kind: basic
version: 1
level: 2
tags: [dynamic-programming, grids, recognition, lc-64, lc-2290]
requires:
  - algo-basics/technique-memo-vs-table
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: LC 2290 allows all four directions. Which algorithm does it need instead, and what cycle breaks the table order?
---

> Given an `m x n` grid filled with non-negative numbers, find a path
> from top left to bottom right which minimizes the sum of all numbers
> along its path. You can only move either down or right at any point.

## What property of the allowed moves lets each cell be computed from earlier cells, and in what order?

---

**"Only down or right": the grid is a DAG, so a table DP filled row by row works.**

`d[i][j] = g[i][j] + min(d[i−1][j], d[i][j−1])` reads only final
cells: row-major order is a topological order. With up or left moves too
(LC 2290), cells reach each other, no fill order exists, and it becomes
a shortest-path search.
