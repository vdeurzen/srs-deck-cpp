---
id: gr-multi-source-seed
kind: basic
version: 1
level: 2
tags: [graphs, bfs, grids]
requires:
  - graph-bfs-worked
  - graph-grid-as-graph
refs:
  - https://leetcode.com/problems/01-matrix/
  - https://cp-algorithms.com/graph/breadth-first-search.html
elaborate: Say in one sentence, as to an interviewer, what one BFS per 0 would cost on a grid with many 0s.
---

Every cell of this grid wants its number of up, down, left or right
steps to the nearest 0.

```text
0 1 1
1 1 1
1 1 0
```

## How can a single BFS give every cell its distance to the nearer 0?

---

**Start it with both 0s in the queue, each at distance 0.**

BFS reaches cells in order of distance from whatever it started with,
so each cell is first reached from its nearest 0. That is one pass over
the cells, where one BFS per 0 repeats the whole grid for each.
