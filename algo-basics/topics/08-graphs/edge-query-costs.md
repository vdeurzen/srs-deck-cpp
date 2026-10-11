---
id: graph-edge-query-costs
kind: basic
version: 2
level: 2
tags: [foundations, graphs, representation, complexity]
requires:
  - graph-matrix-from-edges
  - graph-list-from-edges-chunk
  - graph-degree-from-edge-list
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list#Trade-offs
elaborate: At what V would the same choice stop fitting in your L2 cache?
---

## A router checks for a direct link between u and v millions of times on a network of V = 1 000 hosts. Which representation answers it fastest: edge list, adjacency matrix or adjacency list?

```
edge list  (0,1) (0,2) (2,3)       matrix  V × V bits
adj list   0: 1 2   1: 0   2: 0 3   3: 2
```

---

**The adjacency matrix: one cell read, O(1).**

The edge list scans its E pairs; the adjacency list scans u's deg(u)
neighbours. The matrix pays V² bits, here 10⁶ bits = 125 kB: affordable
for 1 000 hosts, ruinous for a million.
