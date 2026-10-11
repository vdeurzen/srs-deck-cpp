---
id: graph-vertex-edge-sets
kind: basic
version: 1
level: 1
tags: [foundations, graphs, vocabulary]
refs:
  - https://en.wikipedia.org/wiki/Graph_(discrete_mathematics)
elaborate: In your own code, what would the vertices and edges be for a call graph? For a build's dependencies?
---

## A lab has hosts a, b, c and d. Cables join a–b, b–c and a–c; d is not cabled yet. Write this network as a graph G = (V, E).

```
a ─── b
 ╲   ╱
   c        d
```

---

**V = {a, b, c, d}, E = {{a, b}, {b, c}, {a, c}}: |V| = 4, |E| = 3.**

The hosts are the vertices; each cable is an edge, a pair of vertices
from V. d still belongs to V: a vertex needs no edge to be part of the
graph.
