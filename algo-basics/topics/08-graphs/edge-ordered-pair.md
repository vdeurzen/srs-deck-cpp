---
id: graph-edge-ordered-pair
kind: basic
version: 2
level: 1
tags: [foundations, graphs, vocabulary]
requires:
  - graph-vertex-edge-sets
refs:
  - https://en.wikipedia.org/wiki/Directed_graph
elaborate: Is "module A imports module B" one of these? What about "A and B share a lock"?
---

## You model two relations between people as graphs: "paid" (Ana paid Bo) and "met" (Ana met Bo). Which one needs directed edges?

```
Ana ─ ─ ─ Bo
```

---

**"paid": its edge is an ordered pair (Ana, Bo), and (Bo, Ana) is a different fact.**

Ana paying Bo says nothing about Bo paying Ana, so the order carries
meaning: an arrow Ana → Bo. Meeting is mutual, so its edge is the
unordered pair {Ana, Bo}: an undirected edge.
