---
id: graph-explain-call-graph-analysis
kind: explain
version: 1
level: 5
tags: [graphs, compilers, dataflow]
requires:
  - graph-scc-condensation
  - graph-reverse-postorder
  - graph-fixpoint-order-independent
refs:
  - https://doi.org/10.1137/0201010
  - https://doi.org/10.1145/321921.321938
---
A compiler must infer, for every function in a 50 000-function program,
whether it can throw. Functions call each other, some mutually
recursively, and each body is a CFG. Walk through how you would order
the work so it finishes fast and gives the same answer every run.
---
- [ ] Freeze the call graph (and each CFG) to CSR before analysing, since it is traversed far more than mutated
- [ ] Condense the call graph with Tarjan's SCC algorithm (iterative DFS): it emits groups callees-first, so each caller sees finished callee summaries
- [ ] Analyse each mutually recursive group to a local fixpoint, starting optimistic ("cannot throw") and only moving down the lattice
- [ ] Inside a function, visit blocks in reverse postorder so one sweep carries facts down every acyclic path; loops cost a few extra passes
- [ ] The result does not depend on visiting order as long as the transfer functions are monotone; order only changes the number of passes
