---
id: graph-path-cycle-component
kind: basic
version: 2
level: 1
tags: [foundations, graphs, vocabulary]
requires:
  - graph-vertex-edge-sets
refs:
  - https://en.wikipedia.org/wiki/Path_(graph_theory)
elaborate: Where in your own code does a walk that revisits a node cause trouble — a retry loop, a redirect chain, a parent pointer?
---

## Which one of these vertex sequences is a path in the graph: 0 1 2 3 4, 0 1 3, or 2 1 0 1?

```
0 ─ 1 ─ 2
    │   │
    4 ─ 3
```

---

**Only 0 1 2 3 4.**

A path steps along edges and never repeats a vertex. 0 1 3 jumps from
1 to 3, which share no edge. 2 1 0 1 uses real edges but visits 1
twice: a walk, not a path.
