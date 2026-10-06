---
id: graph-shortest-path-choice
kind: cloze
version: 1
level: 4
tags: [graphs, shortest-paths]
requires:
  - graph-dijkstra-nonnegative
refs:
  - https://en.wikipedia.org/wiki/Shortest_path_problem
  - https://en.wikipedia.org/wiki/Floyd%E2%80%93Warshall_algorithm
---

Pick the algorithm from the weights, not from habit. All edges of equal
weight: plain {{c1::BFS::O(V + E), no priority queue at all}}. Weights
drawn from {0, 1}: **0-1 BFS**, which keeps the frontier sorted using a
{{c2::deque::push-front for a 0-edge, push-back for a 1-edge}} instead
of a heap, also in O(V + E). Small integer weights bounded by C: a
bucket queue or radix heap, O(E + V·C) or better.

Arbitrary non-negative weights: Dijkstra, O((V + E) log V) with a binary
heap. Any negative weight: {{c3::Bellman-Ford::O(V·E), and it detects
negative cycles}}. A DAG, with weights of any sign: relax edges in
{{c4::topological order}}, O(V + E) — which is also how you find the
*longest* path in a DAG, and therefore the critical path of a schedule.

All pairs, dense graph: Floyd–Warshall, O(V³) with a tiny constant and
perfect locality — three nested loops over a matrix, and the same code
computes transitive closure with bitwise OR. All pairs, sparse graph:
{{c5::Johnson's algorithm::reweight with Bellman-Ford, then run Dijkstra
from each source}}.

One goal rather than all: A\* with an admissible heuristic — Dijkstra is
exactly A\* with the zero heuristic, so the question is only how much
the heuristic prunes. And for a road network queried millions of times,
none of the above: precompute with contraction hierarchies and answer
each query in microseconds.
