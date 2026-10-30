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
An interviewer gives you a grid walked from one corner to the opposite
one and asks how you know a table can be filled for it, and how you
would fill it. Answer aloud.
---
- [ ] Moves go only down or right, so the walk never returns to a cell: the grid has no cycles
- [ ] So filling row by row, the cells above and to the left are final before a cell reads them
- [ ] Each cell combines those two: the smaller plus its own number for a best sum, their sum for a count
- [ ] The first row and column are reachable one way only, so for a path count they all start at 1
- [ ] It takes O(mn) time, and one rolling row of n cells is enough memory
