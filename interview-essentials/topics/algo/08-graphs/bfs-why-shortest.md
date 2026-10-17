---
id: graph-bfs-why-shortest
kind: basic
version: 1
level: 2
tags: [graphs, traversal, shortest-paths, invariants]
requires:
  - graph-bfs-and-dfs
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
elaborate: Give every edge of this graph a weight of 1 or 5. Which step of the argument breaks?
---

## In an unweighted graph, why is the *first* time BFS reaches a vertex already along a shortest path?

```
0 ─ 1 ─ 3 ─ 5        BFS from 0:  dist 0 1 1 2 2 3
│       │                      for  0 1 2 3 4 5
2 ───── 4            3 is reached from 1 (dist 2) before
                     the longer route 0-2-4-3 gets there
```

---

**The queue holds vertices in nondecreasing distance: every distance-d vertex leaves before any d + 1.**

So the vertices that discover v are popped in distance order, and the
first one is a nearest neighbour of v on some shortest path. Any later
discoverer is at least as far, so it cannot offer a shorter route.
