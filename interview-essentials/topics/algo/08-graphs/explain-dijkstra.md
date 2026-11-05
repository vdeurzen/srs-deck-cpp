---
id: graph-explain-dijkstra
kind: explain
version: 2
level: 4
tags: [graphs, shortest-paths, interview]
requires:
  - graph-weighted-path-cost
  - graph-dijkstra-worked
  - gr-dijkstra-heap-parsons
  - graph-dijkstra-why-nonnegative
refs:
  - https://doi.org/10.1007/BF01386390
  - https://cp-algorithms.com/graph/dijkstra_sparse.html
elaborate: A road map's weights change every few minutes with traffic. Say aloud what you would rerun, and what you could keep.
---
An interviewer asks you to explain Dijkstra's algorithm. Answer aloud,
in about a minute.
---
- [ ] Dijkstra finds the cheapest path from a source when edges cost different amounts; BFS counts hops, not cost
- [ ] Dijkstra repeatedly pops the unpopped vertex with the smallest `dist`, then relaxes that vertex's out-edges
- [ ] A min-heap that skips stale entries gives O(E log E), which is about O(E log V)
- [ ] A negative edge breaks "popped means final", because a later path can still lower a popped vertex's `dist`
- [ ] (empty: tick this)
