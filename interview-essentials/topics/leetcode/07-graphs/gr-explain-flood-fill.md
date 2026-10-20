---
id: gr-explain-flood-fill
kind: explain
version: 1
level: 3
tags: [graphs, grids, recognition, lc-200, lc-542]
requires:
  - gr-grid-dfs-code
  - gr-multi-source-bfs-code
refs:
  - https://leetcode.com/problems/number-of-islands/
  - https://leetcode.com/problems/01-matrix/
  - https://en.wikipedia.org/wiki/Flood_fill
elaborate: Where outside interviews have you seen "paint everything joined to this cell", such as a paint bucket tool or finding the blast radius of a failed service?
---
An interviewer hands you a grid problem about groups of cells and asks
how you recognise the search it needs, and how you would cost it.
Answer aloud.
---
- [ ] Cue: a grid of cells joined up, down, left and right; count or measure the groups
- [ ] Pattern: scan every cell; each unvisited land cell starts a DFS that marks its whole group visited
- [ ] Example: Number of Islands, the number of groups of '1' cells in a grid
- [ ] Cost: O(rows × cols), since each cell is marked once and checked from at most four neighbours
- [ ] Look-alike: steps to the nearest 0 from every cell need a BFS seeded with all the 0s
