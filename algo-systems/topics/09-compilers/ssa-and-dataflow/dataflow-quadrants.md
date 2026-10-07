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

Analyses are named on two axes, direction and may/must. Reaching
definitions is forward-may. Available expressions is
forward-{{c1::must::the other quantifier}}, so its meet is
{{c2::intersection::a set operation}} and its initial value is
"everything". Liveness is {{c3::backward::a direction}}-may.
