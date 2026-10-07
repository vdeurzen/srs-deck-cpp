---
id: graph-bellman-ford
kind: basic
version: 1
level: 3
tags: [graphs, shortest-paths]
requires:
  - graph-dijkstra-nonnegative
refs:
  - https://en.wikipedia.org/wiki/Bellman%E2%80%93Ford_algorithm
---

## Bellman–Ford handles negative weights by relaxing every edge V − 1 times. What does it mean if a V-th pass still lowers a distance?

---

**A negative cycle is reachable: some shortest paths do not exist.**

A shortest simple path has at most V − 1 edges, so V − 1 passes settle
every distance that is defined. Any further improvement needs a path
that repeats a vertex and gets cheaper — a negative cycle. Cost:
O(V·E), against Dijkstra's O((V + E) log V).
