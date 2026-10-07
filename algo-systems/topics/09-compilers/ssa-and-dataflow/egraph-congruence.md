---
id: compiler-egraph-congruence
kind: basic
version: 1
level: 5
tags: [compilers, optimisation, rewriting, union-find]
requires:
  - compiler-egraphs
  - compiler-hash-consing
  - graph-union-find
refs:
  - https://arxiv.org/abs/2004.03082
elaborate: egg lets congruence break during a batch of merges and repairs it once per iteration. Why is that cheaper than repairing after every union?
---

## An e-graph merges the classes of `x` and `y`. Which other classes may it now have to merge?

---

**Those of `f(x)` and `f(y)`, for every operator `f` applied to both: congruence closure.**

Union-find merges the class ids. A hashcons from "operator + canonical
child classes" to class then finds parents that became equal, which are
merged in turn.
