---
id: compiler-dataflow-quadrants
kind: cloze
version: 1
level: 5
tags: [compilers, dataflow]
requires:
  - compiler-worklist-dataflow
refs:
  - https://suif.stanford.edu/~courses/cs243/
  - https://en.wikipedia.org/wiki/Data-flow_analysis
---

Dataflow analyses differ in direction and in how they treat paths.

- Available expressions asks whether `a + b` was computed on the way
  here, so a block can reuse it: a forward
  {{c1::must::a quantifier over paths}} analysis.
- A fact required on every incoming path is merged at a join with
  {{c2::intersection::a set operation}}.
- Liveness asks whether `x` is read before it is overwritten: it is
  propagated {{c3::backward::a direction}}.
