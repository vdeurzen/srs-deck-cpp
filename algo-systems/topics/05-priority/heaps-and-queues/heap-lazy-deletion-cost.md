---
id: heap-lazy-deletion-cost
kind: basic
version: 1
level: 4
requires:
  - heap-lazy-deletion
tags: [heaps, graphs, complexity]
elaborate: If supersedes vastly outnumber pops, how big can the queue get, and when would you rebuild it or switch to an indexed heap?
refs:
  - https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm#Running_time
---

## With lazy deletion, Dijkstra's queue holds up to E entries instead of V. Why is the bound still O((V+E) log V)?

---

**Because log E ≤ 2 log V: a simple graph has E ≤ V².**

Each operation costs O(log E) = O(log V). Every push yields at most one
pop, so there are O(E) operations in all; a stale pop pays its log but
skips the edge scan. What does grow is memory: O(E) entries, not O(V).
