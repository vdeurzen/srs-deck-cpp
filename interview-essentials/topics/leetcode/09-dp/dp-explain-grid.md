---
id: dp-explain-grid
kind: explain
version: 2
level: 3
tags: [grids, recognition, lc-64, lc-62]
requires:
  - dp-grid-dag-signal
  - dp-grid-paths-chunk
  - dp-min-path-sum-code
refs:
  - https://leetcode.com/problems/minimum-path-sum/
  - https://leetcode.com/problems/unique-paths/
  - https://doi.org/10.1090/S0002-9904-1954-09848-8
elaborate: Edit distance's table is also a grid filled from the top-left. Which moves in that grid play the roles of "down" and "right", and what is the third move?
---
An interviewer gives you a grid of non-negative numbers and asks for
the smallest sum along a path from the top-left to the bottom-right
cell, moving only down or right. Explain how you would fill a table for
it, and why that order works. Answer aloud.
---
- [ ] Moves go only down or right, so the walk never returns to a cell: the grid has no cycles
- [ ] So filling row by row, the cells above and to the left are final before a cell reads them
- [ ] Each cell holds its own number plus the smaller of the best sums above it and to its left
- [ ] Cells outside the grid act as walls that never win the minimum, except the way in at the corner
- [ ] It takes O(mn) time, and one rolling row of n cells is enough memory
