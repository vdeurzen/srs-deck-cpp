---
id: gr-grid-dfs-depth
kind: basic
version: 1
level: 3
tags: [graphs, dfs, flood-fill, grids, recursion, lc-200]
requires:
  - gr-grid-dfs-code
  - technique-recursion-depth
refs:
  - https://leetcode.com/problems/number-of-islands/
  - https://man7.org/linux/man-pages/man2/getrlimit.2.html
elaborate: Which of your own recursive walks (AST, directory tree, dependency graph) has a depth set by the input's size rather than its shape?
---

The recursive `sink` from LC 200 (mark the cell, then recurse down,
right, up, left) is accepted: LeetCode's grids are at most 300 × 300.

## What bounds `sink`'s recursion depth on an m × n all-`'1'` grid, and is 1000 × 1000 safe?

---

**Up to m·n frames, not m + n: the walk can chain through every cell (10⁶ here), and the main-thread stack is typically 8 MB.**

Even 8 bytes a frame, a bare return address, is 8 MB. Real frames also
hold `r`, `c`, `k` and saved registers. Use an explicit stack or BFS.
