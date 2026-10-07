---
id: graph-topo-build-system
kind: basic
version: 1
level: 3
tags: [graphs, scheduling, concurrency]
requires:
  - graph-topological-order
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting#Kahn's_algorithm
elaborate: In a job runner you know, what decides which ready task starts first — and what would critical-path priority change?
---

## A build tool runs a DAG of compile jobs on 32 cores. Why is Kahn's algorithm, rather than DFS postorder, the natural fit?

---

**Its zero-in-degree queue *is* the set of runnable jobs; they can all start now.**

When a job finishes, decrement its dependents and enqueue those that
reach zero: sorting and scheduling are one loop, with progress visible
for free. Prefer the ready job with the longest remaining critical path
to shorten the whole build.
