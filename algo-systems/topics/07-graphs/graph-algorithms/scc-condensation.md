---
id: graph-scc-condensation
kind: basic
version: 1
level: 5
tags: [graphs, compilers, dfs]
requires:
  - graph-tarjan-scc
  - graph-topological-order
refs:
  - https://doi.org/10.1137/0201010
  - https://en.wikipedia.org/wiki/Strongly_connected_component#Definitions
elaborate: Where else does a "mutually dependent group" need handling as a unit — type inference, package imports, spreadsheet formulas?
---

## Tarjan emits SCCs in reverse topological order of the condensation. Why is that exactly the order an interprocedural analysis wants over the call graph?

---

**Callees come out before callers, so a bottom-up analysis needs no extra sort.**

Collapsing each mutually recursive group to one node leaves a DAG.
Analyse each emitted group to a fixpoint; by the time a caller's group
appears, every summary it needs is final. Type generalisation of
recursive definitions and 2-SAT use the same order.
