---
id: graph-dijkstra-nonnegative
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths, misconception]
elaborate: Where might a negative weight sneak into a graph you work with — a cost model, a latency budget, a profit calculation?
requires:
  - graph-bfs-and-dfs
  - heap-vocabulary
refs:
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---

## True or false: Dijkstra's algorithm works with negative edge weights as long as there is no negative cycle.

---

**False.** No negative cycle is what makes shortest paths *well
defined*; it is not what makes Dijkstra correct.

Dijkstra's correctness rests on a greedy invariant: when a vertex is
popped with the smallest tentative distance, that distance is final,
because every other path to it goes through some unpopped vertex whose
distance is already ≥ this one, and extending a path can only make it
**longer**. A negative edge breaks the last clause — a longer-looking
prefix can still lead to a shorter total — so a vertex can be finalised
too early and never corrected.

The minimal counterexample is three vertices: `s→u` with weight 1,
`s→v` with weight 2, and `v→u` with weight −2. There is no cycle at
all, let alone a negative one. Dijkstra pops `u` first at distance 1
and finalises it, but the true shortest distance to `u` is 2 − 2 = 0
via `v`, discovered only after `u` has been closed.

What to use instead:

- **Bellman–Ford**, O(V·E): relax every edge V−1 times; a further
  relaxation that still improves something proves a negative cycle, and
  tracing back from that edge reports it. This is the algorithm to
  reach for when negative weights are real (currency arbitrage,
  profit-and-cost graphs, constraint systems of difference
  inequalities).
- **Johnson's algorithm** for all-pairs on a sparse graph: one
  Bellman–Ford pass computes a potential that **reweights every edge to
  be non-negative while preserving shortest paths**, then run Dijkstra
  from each source. The reweighting trick is the useful idea to
  remember — it is also how A\*'s heuristic is justified.
- **DAG relaxation** in topological order, O(V+E), if the graph is
  acyclic: negative weights are no problem at all there.

And know the variants for when weights are special: BFS for unit
weights, **0-1 BFS** with a deque (push-front for 0, push-back for 1)
for two-valued weights, and a bucket queue or radix heap for small
integer weights — each is faster than a general heap-based Dijkstra.
