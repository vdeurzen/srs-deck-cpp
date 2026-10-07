---
id: graph-direction-optimising-bfs
kind: basic
version: 1
level: 4
tags: [graphs, traversal, performance]
requires:
  - graph-bfs-and-dfs
refs:
  - https://doi.org/10.1109/SC.2012.50
---

## Once a BFS frontier covers much of a social-network graph, each *unvisited* vertex instead scans its own neighbours for a frontier parent. Why is that faster?

---

**Most unvisited vertices find a frontier parent at their first neighbour and stop.**

Top-down, a huge frontier examines every out-edge, nearly all leading
to vertices already visited. Bottom-up, each remaining vertex stops at
its first hit. Beamer et al. switch direction by frontier size and
measure several-fold speed-ups on low-diameter graphs.
