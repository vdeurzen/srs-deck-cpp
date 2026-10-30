---
id: gr-explain-flood-fill
kind: explain
version: 3
level: 3
tags: [graphs, grids, recognition, interview, lc-200, lc-542]
requires:
  - gr-grid-dfs-code
  - gr-multi-source-bfs-code
refs:
  - https://leetcode.com/problems/number-of-islands/
  - https://leetcode.com/problems/01-matrix/
  - https://en.wikipedia.org/wiki/Flood_fill
elaborate: Where outside interviews have you seen "paint everything joined to this cell", such as a paint bucket tool or finding the blast radius of a failed service?
---
An interviewer hands you a grid of land and water and asks how many
separate islands it has. Talk it through. Answer aloud.
---
- [ ] Land cells joined up, down, left or right form one island, so an island is one reachable group
- [ ] Scan every cell; each land cell not yet visited starts a new walk and adds one island
- [ ] The walk, a DFS or a BFS, marks every land cell it reaches, so that island is never counted again
- [ ] On rows 101 over 111, one walk from the top-left reaches all five land cells: one island
- [ ] That is O(rows × cols), since each cell is marked once and checked from at most four neighbours
