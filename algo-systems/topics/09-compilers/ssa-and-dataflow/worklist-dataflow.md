---
id: compiler-worklist-dataflow
kind: cloze
version: 1
level: 5
tags: [compilers, dataflow, lattices]
requires:
  - compiler-liveness
refs:
  - https://dl.acm.org/doi/10.1145/512927.512945
  - https://suif.stanford.edu/~courses/cs243/
---

A dataflow analysis is a **lattice** of facts with a meet, a **transfer
function** per block, and a **direction**. Starting from the optimistic
top and iterating until nothing changes reaches Kildall's
{{c1::maximum fixpoint::a lattice term}}. The loop terminates because the
lattice has {{c2::finite height::a property of its chains}} and every
transfer function is {{c3::monotone::a property of each function}}, so
each fact can only move down a bounded number of times.
