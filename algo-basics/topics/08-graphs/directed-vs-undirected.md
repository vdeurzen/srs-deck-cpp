---
id: graph-directed-vs-undirected
kind: basic
version: 1
level: 1
tags: [graphs, vocabulary, representation]
refs:
  - https://en.wikipedia.org/wiki/Directed_graph
elaborate: Which relation in your own code looks symmetric but is not — calls, imports, foreign keys?
---

## Ana follows Bo; Bo does not follow Ana. Ana and Cy are friends. How does an adjacency list store each of these edges?

```
follows (directed):     Ana → Bo
friends (undirected):   Ana ─ Cy
```

---

**The directed edge once, in Ana's list; the undirected edge twice, in both lists.**

Follows: `Ana: Bo`, and Bo's list stays empty. Friends: `Ana: Cy` and
`Cy: Ana`. So a directed vertex has an out-degree and an in-degree, and
"reachable from" is no longer symmetric.
