---
id: graph-dag-shortest-paths-worked
kind: basic
version: 1
level: 2
tags: [graphs, shortest-paths, topological-sort, worked-example]
requires:
  - interview-essentials/graph-topo-order
  - interview-essentials/graph-bellman-ford-rounds
refs:
  - https://en.wikipedia.org/wiki/Topological_sorting#Application_to_shortest_path_finding
---

## Shortest paths from s in a DAG with edges s → a (1), s → b (4), a → b (−2): visit the vertices in topological order, s, a, b, and relax each one's out-edges once.

```
relax from   updates            dist s a b
s            a = 1, b = 4       0 1 4
a            b = 1 − 2 = −1     0 1 −1
b            no out-edges       0 1 −1
```

Why can b's out-edges wait for b's turn, with no second pass?

---

**Every edge into b starts at an earlier vertex, so `dist[b]` is final by then.**

Topological order puts s and a before b, and both have been relaxed when
b's turn comes. So one pass is enough, O(V + E), and negative edges are
fine: no cycle can bring a later improvement.
