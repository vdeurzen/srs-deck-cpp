---
id: dp-grid-dag-signal
kind: basic
version: 1
level: 2
tags: [dynamic-programming, grids, recognition, lc-64, lc-2290]
requires:
  - technique-memo-vs-table
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/minimum-obstacle-removal-to-reach-corner/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: With moves down, right and up-right, row-major order fails, yet a table DP still works. Which fill order does, and why?
---

> Given an `m x n` grid filled with non-negative numbers, find a path
> from top left to bottom right which minimizes the sum of all numbers
> along its path. You can only move either down or right at any point.

A row-by-row table solves it with
`d[i][j] = g[i][j] + min(d[i−1][j], d[i][j−1])`.

## If moves up and left were allowed too, could any table fill order still work?

---

**No: two cells could then reach each other, so neither can be filled first.**

Down-or-right moves make the grid a DAG: `d[i][j]` reads only cells
above and to the left, already final, so row-major is a topological
order. A cycle has no such order; with non-negative costs it becomes a
shortest-path search (Dijkstra).
