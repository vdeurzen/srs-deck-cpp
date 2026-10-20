---
id: graph-prim-worked
kind: basic
version: 1
level: 2
tags: [graphs, mst, greedy, worked-example]
requires:
  - graph-mst-cut-property
  - interview-essentials/graph-dijkstra-worked
refs:
  - https://doi.org/10.1002/j.1538-7305.1957.tb01515.x
  - https://en.wikipedia.org/wiki/Prim%27s_algorithm
---

## Prim's minimum spanning tree from a, on the edges a–b (4), a–c (1), b–c (2). `best[v]` is the lightest edge joining v to the tree so far; each step adds the vertex with the smallest `best`, then lowers its neighbours' `best`.

```
add   cost   best[b]   best[c]   total
a     0      4         1         0
c     1      2         —         1
b     2      —         —         3
```

Why does `best[b]` drop to 2, and not to 1 + 2 = 3?

---

**b joins by one edge, c–b, and Prim pays that edge alone.**

The tree grows one edge at a time, and c is already in it, so b's
cheapest link is the edge c–b of weight 2. Dijkstra would store 3 here:
the length of the whole path from a.
