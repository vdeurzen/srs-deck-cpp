---
id: graph-explain-visited-linear
kind: explain
version: 1
level: 2
tags: [foundations, graphs, traversal, complexity]
requires:
  - graph-bfs-queue-chunk
  - graph-adjacency-list-vs-matrix
  - graph-degree-from-edge-list
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search#Time_and_space_complexity
  - https://doi.org/10.1137/0201010
elaborate: Where does the same visited-set idea keep one of your own tools from looping — a crawler, a garbage collector, a dependency resolver?
---
A colleague's graph walk hangs on some inputs. Explain to them, as you
would in an interview, what a `visited` record changes about a BFS or
DFS.
---
- [ ] Without marks, a cycle, or the way back along any undirected edge, re-adds vertices forever
- [ ] A visited mark, set when a vertex is first reached, lets each vertex be processed once
- [ ] With marks, a walk over adjacency lists scans each vertex once and each stored edge entry once: O(V + E)
