---
id: graph-shortest-path-choice
kind: cloze
version: 1
level: 4
tags: [graphs, shortest-paths]
requires:
  - graph-zero-one-bfs
  - graph-bellman-ford
refs:
  - https://en.wikipedia.org/wiki/Shortest_path_problem
  - https://en.wikipedia.org/wiki/Breadth-first_search
---

Single source: pick the algorithm from the weights, not from habit.
All edges of equal weight: plain {{c1::BFS::hop counts in a network}}.
Weights drawn from {0, 1}: 0-1 BFS, which keeps the frontier sorted in a
{{c2::deque::free moves versus paid moves on a grid}} instead of a heap,
also O(V + E). Arbitrary non-negative weights: Dijkstra,
O((V + E) log V). Any negative weight:
{{c3::Bellman-Ford::currency arbitrage graphs}}.
