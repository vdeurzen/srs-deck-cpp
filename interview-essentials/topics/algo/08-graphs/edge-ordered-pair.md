---
id: graph-edge-ordered-pair
kind: basic
version: 3
level: 1
tags: [foundations, graphs, vocabulary]
requires:
  - graph-vertex-edge-sets
refs:
  - https://en.wikipedia.org/wiki/Directed_graph
elaborate: Is "module A imports module B" one of these? What about "A and B share a lock"?
---

## A payments graph stores "Ana paid Bo" as the edge (Ana, Bo), and the edge (Bo, Ana) would be a different fact. What is a graph whose edges work like this called?

```
Ana ───► Bo
```

---

**Directed: each edge is an ordered pair, drawn as an arrow Ana → Bo.**

The order carries meaning: Ana paying Bo says nothing about Bo paying
Ana. "Ana met Bo" is mutual, so its edge is the unordered pair
{Ana, Bo}, and a graph of such edges is undirected.
