---
id: graph-traversal-work-trace
kind: basic
version: 2
level: 2
tags: [foundations, graphs, traversal, complexity]
requires:
  - interview-essentials/graph-degree-from-edge-list
  - interview-essentials/graph-bfs-queue-chunk
elaborate: How does this count change if the same graph is stored as a V × V matrix, and when would you accept that?
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
---

## Breadth-first search runs over a connected undirected graph stored as adjacency lists, with V = 5 vertices and E = 7 edges. Each popped vertex tests every neighbour on its list (`if (!seen[v])`). How many neighbour tests does the whole search make?

---

**2E = 14: each list is scanned once, and the lists hold 2E entries.**

Each vertex enters the queue once, so its list is scanned once, and an
undirected edge appears in both its endpoints' lists. Add V pushes and
pops: O(V + E), with the 2E term dominating on dense graphs.
