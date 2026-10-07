---
id: heap-fibonacci-in-practice
kind: basic
version: 1
level: 4
requires:
  - heap-fibonacci-decrease-key
  - heap-d-ary
tags: [heaps, graphs, memory-hierarchy, misconception]
elaborate: Which priority queue does the shortest-path code you know use, and was that choice ever measured against an alternative?
refs:
  - https://doi.org/10.1145/28869.28874
  - https://doi.org/10.1145/235141.235145
---

## A Fibonacci heap gives Dijkstra the better bound, yet road-routing services measure a 4-ary array heap as faster. Why does the Fibonacci heap lose?

---

**Pointer chasing and large constants: every operation walks separately allocated nodes.**

Its trees are circular lists of nodes, so every step is a likely cache
miss where the array heap walks one contiguous path. Consolidation
arrives in amortised bursts, and the bound wins only on dense graphs at
sizes few services reach.
