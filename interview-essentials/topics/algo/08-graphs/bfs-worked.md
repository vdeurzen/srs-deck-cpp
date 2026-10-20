---
id: graph-bfs-worked
kind: basic
version: 1
level: 1
tags: [graphs, traversal, worked-example]
requires:
  - graph-bfs-and-dfs
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §20.2
---

BFS from 0. Each step pops the queue's front `u`; every neighbour not
yet reached gets `dist = dist[u] + 1` and joins the back.

```
0 ─ 1        step  pop  queue after  dist 0 1 2 3
│   │        start  —   0            0 - - -
2 ─ 3        1      0   1 2          0 1 1 -
             2      1   2 3          0 1 1 2
             3      2   3            0 1 1 2
             4      3   (empty)      0 1 1 2
```

## At step 3, 2 is next to 3, yet popping 2 changes nothing. Why?

---

**3 was already reached at step 2, from 1, so it is skipped.**

A vertex is marked as it joins the queue, so it enters once. 2 is as
far from 0 as 1 is, so its route to 3 is no shorter: the first time
BFS reaches a vertex already gives its distance.
