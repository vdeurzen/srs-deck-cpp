---
id: graph-directed-vs-undirected
kind: basic
version: 1
level: 1
tags: [graphs, vocabulary, representation]
requires:
  - graph-edge-ordered-pair
  - graph-adjacency-list-vs-matrix
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

**One entry per direction the edge can be followed: Ana → Bo once, Ana ─ Cy twice.**

Follows: `Ana: Bo`, and Bo's list stays empty. Friends: `Ana: Cy` and
`Cy: Ana`. So in a directed graph "reachable from" is no longer
symmetric: Bo cannot reach Ana.
