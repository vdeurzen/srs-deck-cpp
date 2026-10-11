---
id: graph-component-count
kind: basic
version: 1
level: 1
tags: [foundations, graphs, vocabulary, connectivity]
requires:
  - graph-path-cycle-component
refs:
  - https://en.wikipedia.org/wiki/Component_(graph_theory)
---

## How many connected components does this undirected graph have?

```
0 ─ 1 ─ 2      6 ─ 7
    │   │
    4 ─ 3      5
```

---

**3: {0, 1, 2, 3, 4}, {6, 7} and {5}.**

A component is a largest group of vertices in which every pair is
joined by a path. Vertex 5 has no edge, so it is a component on its
own. The graph is connected exactly when there is one component.
