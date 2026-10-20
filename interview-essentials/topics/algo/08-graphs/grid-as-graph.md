---
id: graph-grid-as-graph
kind: basic
version: 1
level: 1
tags: [foundations, graphs, grids]
requires:
  - graph-vertex-edge-sets
refs:
  - https://en.wikipedia.org/wiki/Lattice_graph
  - https://en.wikipedia.org/wiki/Row-_and_column-major_order
elaborate: A maze search is told it may also move diagonally. What changes in the offset arrays, and what stays the same?
---

## A search treats this 3 × 4 grid as a graph: each cell (r, c) is a vertex with id `r * 4 + c`, and moving one cell up, down, left or right follows an edge. Which ids share an edge with (1, 2)?

```
       c=0  c=1  c=2  c=3
r=0    .    .    .    .
r=1    .    .    X    .
r=2    .    .    .    .
```

---

**2, 10, 5 and 7: a row step moves the id by 4, a column by 1.**

(1, 2) is id 6. Code steps on (r, c) with offsets `dr`, `dc` =
{−1, 1, 0, 0}, {0, 0, −1, 1} and checks bounds first: on raw ids,
7 + 1 = 8 wraps to the next row.
