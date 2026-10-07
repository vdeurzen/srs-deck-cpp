---
id: graph-topo-order
kind: basic
version: 1
level: 1
requires:
  - graph-directed-vs-undirected
tags: [graphs, topological-sort, scheduling]
refs:
  - https://doi.org/10.1145/368996.369025
  - https://en.wikipedia.org/wiki/Topological_sorting
elaborate: Where does your own tooling need this order — a build, a migration, a module loader?
---

## A build has these dependencies (an edge `a → b` means a must be built before b). Which graphs have an order that respects every edge?

```
lex → parse      parse → check      check → codegen
codegen → link   check → link
                 (variant: add link → lex)
```

---

**Exactly the directed acyclic graphs (DAGs); such an order is a topological order.**

Here: lex, parse, check, codegen, link. The variant closes the cycle
lex → … → link → lex: lex must come before itself, so no order exists.
Without a cycle, some vertex has no incoming edge; put it first, delete
it, repeat.
