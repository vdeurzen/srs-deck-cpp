---
id: graph-reverse-postorder
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dataflow]
requires:
  - graph-topo-dfs-cycle
refs:
  - https://doi.org/10.1145/321921.321938
  - https://en.wikipedia.org/wiki/Data-flow_analysis#Iterative_algorithm
elaborate: A backward analysis such as liveness visits blocks in postorder instead. Why is that the same argument reversed?
---

## Why does an iterative *forward* dataflow analysis visit blocks in reverse postorder?

---

**In RPO every block comes after its predecessors, except along back edges.**

So one sweep carries facts down every acyclic path; only facts flowing
round a loop need another pass. Visiting by block number can cost an
extra pass wherever a block precedes its predecessor. On an acyclic
CFG, RPO is a topological order.
