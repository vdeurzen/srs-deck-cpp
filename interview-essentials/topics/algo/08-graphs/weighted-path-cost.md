---
id: graph-weighted-path-cost
kind: basic
version: 1
level: 1
tags: [foundations, graphs, vocabulary, shortest-paths]
requires:
  - graph-bfs-why-shortest
refs:
  - https://en.wikipedia.org/wiki/Glossary_of_graph_theory#weighted_graph
  - https://doi.org/10.1007/BF01386390
elaborate: Name a graph from your own work whose edges would need weights, and what one weight would measure.
---

## In this weighted graph each edge carries a number, its weight, and a path costs the sum of its weights. BFS from s gives t distance 1. What does the cheapest path from s to t cost?

```
s ───(9)─── t
 ╲         ╱
 (1)     (2)
   ╲     ╱
      a
```

---

**3, along s – a – t: BFS counted edges, not weight.**

BFS distance is the number of edges, so the direct edge wins with 1
hop even though it costs 9. Once edges cost different amounts, fewer
hops can mean a higher sum, and the first arrival is no longer the
cheapest.
