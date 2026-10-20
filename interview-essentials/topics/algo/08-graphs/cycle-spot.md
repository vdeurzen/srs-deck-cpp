---
id: graph-cycle-spot
kind: basic
version: 1
level: 1
tags: [foundations, graphs, vocabulary]
requires:
  - graph-path-cycle-component
refs:
  - https://en.wikipedia.org/wiki/Cycle_(graph_theory)
elaborate: Where in your own code would a cycle be a bug — imports, a build order, a linked list that should end?
---

## You add one edge to this graph: either 1–3, or 3–4 with a new vertex 4. Which addition creates a cycle?

```
0 ─ 1 ─ 2 ─ 3
```

---

**1–3: then 1 2 3 1 leaves 1 and returns to it without reusing an edge.**

A cycle needs a second route between vertices that were already
joined. 1 and 3 were joined through 2; the new edge is another way. 3–4
only stretches the path to a vertex nothing reached before.
