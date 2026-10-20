---
id: dp-explain-grid
kind: explain
version: 1
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
- [ ] Cue: a corner-to-corner walk through a grid, moving only down or right, for a best sum or a count
- [ ] Pattern: each cell's answer combines the cell above and the cell to its left, filled row by row
- [ ] Example: Minimum Path Sum, the smallest sum from top-left to bottom-right moving down or right
- [ ] Cost: O(mn) time, and one rolling row of n cells is enough memory
- [ ] Look-alike: moves in all four directions create cycles, so no table fill order exists
