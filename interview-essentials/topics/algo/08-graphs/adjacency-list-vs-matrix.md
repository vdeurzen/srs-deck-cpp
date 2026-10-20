---
id: graph-adjacency-list-vs-matrix
kind: basic
version: 1
level: 1
tags: [graphs, representation, memory]
requires:
  - graph-vertex-edge-sets
  - complexity-big-o-scaling
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list
  - https://en.wikipedia.org/wiki/Adjacency_matrix
elaborate: Which question would make you switch this road map to a matrix after all?
---

## A road map has V = 10 000 junctions and E = 25 000 two-way roads. Why store it as an adjacency list (each vertex's list of neighbours) rather than a matrix (a V × V table, 1 where an edge exists)?

```
edges 0-1 0-2 2-3     list   0: 1 2        matrix  4 × 4 = 16 cells,
                             1: 0                  6 of them set
                             2: 0 3
                             3: 2
```

---

**Matrix: V² = 100 000 000 cells. List: V + 2E = 60 000 entries.**

A matrix pays for every possible pair, and a sparse graph (E far
below V²) leaves almost all empty. A list also reads u's neighbours
without scanning V cells. Matrices win on dense graphs or O(1) "is
u–v an edge?".
