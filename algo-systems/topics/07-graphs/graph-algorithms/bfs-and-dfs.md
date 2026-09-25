---
id: graph-bfs-and-dfs
kind: basic
version: 1
level: 2
tags: [graphs, traversal]
refs:
  - https://en.wikipedia.org/wiki/Breadth-first_search
  - https://en.wikipedia.org/wiki/Depth-first_search
---

## BFS and DFS differ by one data structure. What does each one's *order* give you that the other's does not?

---

Queue versus stack — and everything else follows.

**BFS visits in nondecreasing distance from the source.** That is the
property: shortest paths in an unweighted graph, level-by-level
processing, and a frontier that can be processed in parallel (every
vertex at distance d is independent). It also bounds memory by the
widest level, which on a wide graph is worse than DFS, not better.

**DFS visits along a path and backtracks**, which gives you the
*timing* structure: discovery and finish times, a spanning forest whose
edges classify as tree / back / forward / cross, and the nesting
property that a vertex's interval contains exactly its descendants'
intervals. Almost every classical graph algorithm is a DFS with
bookkeeping: cycle detection (a back edge), topological order (reverse
finishing order), strongly connected components (Tarjan's lowlink),
bridges and articulation points, and — in compilers — natural loop
detection, which is exactly "a back edge to a dominating header".

Two practical notes that matter more than the theory:

- **Mark on push, not on pop.** A vertex reachable from several
  frontier vertices otherwise enters the queue multiple times. The bug
  is invisible on small graphs and quadratic on large ones.
- **Iterative DFS, always, in production.** Recursion depth is the
  graph's depth, and a 100 k-node chain will blow a default stack. An
  explicit stack of (vertex, edge-iterator) pairs is the standard
  transformation, and it is also what makes the "finish time"
  bookkeeping explicit.

The hybrid worth knowing: **direction-optimising BFS**, which switches
from top-down (scan the frontier's out-edges) to bottom-up (scan
unvisited vertices for a frontier parent) once the frontier is large.
On social-network-shaped graphs that is several times faster, because
in the bottom-up phase most vertices stop at their first neighbour.
