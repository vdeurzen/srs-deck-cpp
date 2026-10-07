---
id: graph-tarjan-on-stack
kind: basic
version: 1
level: 5
tags: [graphs, dfs, invariants]
requires:
  - graph-tarjan-scc
refs:
  - https://doi.org/10.1137/0201010
---

## In Tarjan's algorithm, edge `u → w` reaches an already-visited `w`. Why does it lower `lowlink[u]` only if `w` is still on the stack?

---

**Off the stack, `w`'s component is finished, and nothing in it can reach `u`.**

A component is popped only once nothing in it reaches an earlier open
vertex. Lowering `u`'s lowlink through it would merge two different
SCCs. An on-stack `w` is still open, so `w` reaches back to an ancestor
of `u`: a real cycle through `u`.
