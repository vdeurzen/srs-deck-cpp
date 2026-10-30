---
id: graph-explain-call-graph-analysis
kind: explain
version: 2
level: 5
tags: [graphs, compilers, dataflow]
requires:
  - graph-scc-condensation
  - graph-tarjan-lowlink-trace
  - graph-reverse-postorder
  - graph-fixpoint-order-independent
elaborate: The call graph is traversed far more often than it changes. What representation would you freeze it into first, and why?
refs:
  - https://doi.org/10.1137/0201010
  - https://doi.org/10.1145/321921.321938
---
An interviewer asks: a compiler must infer, for every function in a
50 000-function program, whether it can throw. Functions call each
other, some mutually recursively, and each body is a CFG. In what order
would you do the work so it finishes fast and gives the same answer
every run?
---
- [ ] Condense the call graph into strongly connected components with Tarjan; the condensation is a DAG
- [ ] Tarjan emits components callees first, so each caller's group sees finished callee summaries
- [ ] Analyse each mutually recursive group as a unit, iterating it to a local fixpoint
- [ ] Inside each function, visit blocks in reverse postorder: one sweep carries facts down every acyclic path
- [ ] With monotone transfer functions, visiting order changes only the number of passes, never the result
