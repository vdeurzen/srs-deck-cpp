---
id: gr-grid-dfs-depth
kind: basic
version: 1
level: 3
tags: [graphs, dfs, flood-fill, grids, recursion, lc-200]
requires:
  - graph-bfs-and-dfs
  - technique-recursion-depth
refs:
  - https://leetcode.com/problems/number-of-islands/
  - https://man7.org/linux/man-pages/man2/getrlimit.2.html
elaborate: Which of your own recursive walks (AST, directory tree, dependency graph) has a depth set by the input's size rather than its shape?
---

Number of Islands (LC 200): count the groups of `'1'` cells joined up,
down, left and right. A recursive `sink` (mark the cell, then recurse
down, right, up, left) is accepted: LeetCode's grids are at most
300 × 300.

## Assume an 8 MB stack. Why can `sink` overflow it on a 1000 × 1000 all-`'1'` grid?

---

**The recursion can chain through all 10⁶ cells, one frame each.**

The depth is m·n, not m + n. A real frame holds a return address, `r`,
`c`, `k` and saved registers: 32 bytes or more, so 10⁶ frames need at
least 32 MB. Use an explicit stack or BFS.
