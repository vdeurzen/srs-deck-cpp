---
id: graph-tree-edge-count
kind: basic
version: 1
level: 2
tags: [foundations, graphs, trees, proof]
requires:
  - graph-cycle-spot
  - graph-component-count
refs:
  - https://en.wikipedia.org/wiki/Tree_(graph_theory)
elaborate: A dependency graph has V modules and V − 1 import edges and every module is reachable. What may you conclude without looking?
---

## An undirected graph has 6 vertices and 5 edges, and it contains a cycle. What can you say about its connectivity?

---

**It is disconnected.**

Delete one edge of each cycle until none remain: a cycle edge has a
detour, so connectivity never changes. Now ≤ 4 edges and no cycle. But a
tree (connected and acyclic) on 6 vertices needs exactly V − 1 = 5
edges. So it was never connected.

```
0 ─ 1    3 ─ 4 ─ 5      e.g. 6 vertices, 5 edges:
 ╲ │                    a cycle, two components
   2
```
