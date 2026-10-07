---
id: graph-adjacency-list-vs-matrix
kind: basic
version: 1
level: 1
requires:
  - graph-vocabulary
tags: [graphs, representation, memory]
refs:
  - https://en.wikipedia.org/wiki/Adjacency_list
  - https://en.wikipedia.org/wiki/Adjacency_matrix
elaborate: Which question would make you switch this road map to a matrix after all?
---

## A road map has V = 10 000 junctions and E = 25 000 two-way roads. Why store it as an adjacency list rather than a matrix?

```
edges 0-1 0-2 2-3     list   0: 1 2        matrix  4 × 4 = 16 cells,
                             1: 0                  6 of them set
                             2: 0 3
                             3: 2
```

---

**Matrix: V² = 100 000 000 cells. List: V + 2E = 60 000 entries.**

A matrix pays for every possible pair; a sparse graph (E ≪ V²)
leaves almost all empty. The list also visits u's neighbours in
deg(u) steps, not V. A matrix wins only on dense graphs or when "is u–v
an edge?" must be O(1).
