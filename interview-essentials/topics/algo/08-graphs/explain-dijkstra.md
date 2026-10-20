---
id: graph-explain-dijkstra
kind: explain
version: 1
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
- [ ] Problem: cheapest path from a source when edges cost different amounts; BFS counts hops, not cost
- [ ] Mechanism: pop the unpopped vertex with the smallest `dist`, then relax its out-edges
- [ ] Example: s→a 1, a→b 2 beats s→b 4, because a pops first and lowers b to 3
- [ ] Cost: a min-heap with stale entries skipped gives O(E log E), about O(E log V)
- [ ] Pitfall: a negative edge breaks "popped means final"; use Bellman-Ford there
