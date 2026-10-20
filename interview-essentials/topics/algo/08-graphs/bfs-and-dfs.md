---
id: graph-bfs-and-dfs
kind: basic
version: 1
level: 1
tags: [graphs, traversal]
requires:
  - linear-stack-recognition
  - linear-queue-adt
  - graph-adjacency-list-vs-matrix
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
  - https://doi.org/10.1137/0201010
elaborate: Which graph walk in your own code would break if its queue were swapped for a stack?
---

## BFS and DFS are the same loop over a "to visit" container. What does using a queue instead of a stack change about the order?

```
0 ─ 1 ─ 3          adj  0: 1 2
│                       1: 0 3
2 ─ 4                   2: 0 4
```

---

**The queue visits nearest first, level by level, instead of deepest first.**

From 0, BFS visits 0 1 2 3 4, by hop count. A stack pops the
last-pushed neighbour first, finishing the branch through 2 before 1:
0 2 4 1 3. Recursive DFS takes the first-listed first, 0 1 3 2 4:
just as deep.
