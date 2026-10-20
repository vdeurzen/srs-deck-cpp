---
id: dp-grid-dag-signal
kind: basic
version: 2
level: 2
tags: [grids, recognition, lc-64, lc-2290]
requires:
  - technique-memo-vs-table
  - graph-topo-order
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

## What property of the down-or-right moves lets row-by-row order finish every cell before any cell reads it?

---

**No cycles: a cell is only reached from above or the left, so the grid is a DAG.**

Row-major order is then a topological order: `d[i][j]` reads only cells
already final. With moves in all four directions, two neighbours would
each read the other, and no order could fill either first.
