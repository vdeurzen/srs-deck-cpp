---
id: graph-tarjan-worked
kind: basic
version: 1
level: 5
tags: [graphs, dfs, worked-example]
requires:
  - graph-tarjan-scc
refs:
  - https://doi.org/10.1137/0201010
---

Tarjan's algorithm on `0 → 1`, `1 → 2`, `2 → 1`, from 0. The DFS
visits 0, 1, 2 in that order, so each vertex's index is its number.
`low` lists `low[0] low[1] low[2]`; the stack is bottom to top.

```
event                      low     stack   emitted
visit 0, 1, 2              0 1 2   0 1 2
edge 2→1: 1 is on stack    0 1 1   0 1 2
finish 2: low ≠ index      0 1 1   0 1 2
finish 1: low = index      0 1 1   0       2 1
finish 0: low = index      0 1 1   (empty) 0
```

## Row 3: why does 2 stay on the stack when it finishes?

---

**Its lowlink 1 is below its index 2: it reaches 1, which is still open.**

So 2 belongs to a component rooted higher up, and must wait for that
root. Only a vertex whose lowlink equals its index roots a component;
1 does, and pops everything above it, `{2, 1}`, at row 4.
