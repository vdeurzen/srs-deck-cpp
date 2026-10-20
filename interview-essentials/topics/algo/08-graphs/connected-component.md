---
id: graph-connected-component
kind: basic
version: 1
level: 1
tags: [foundations, graphs, vocabulary, connectivity]
requires:
  - graph-path-cycle-component
refs:
  - https://en.wikipedia.org/wiki/Component_(graph_theory)
elaborate: In a network of servers, what would a second connected component mean for an operator, and how would you notice it?
---

## This graph has 6 vertices and 3 connected components. Which vertices are in the same component as 0?

```
0 ─ 1 ─ 2      3 ─ 4      5
```

---

**0, 1 and 2: every pair is joined by a path, and nothing else joins them.**

A component is a largest group of vertices with paths between all of
them. 3 and 4 form the second; 5, with no edge, is a component of its
own, so every vertex lies in exactly one.
