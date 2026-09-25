---
id: compiler-worklist-dataflow
kind: cloze
version: 1
level: 5
tags: [compilers, dataflow, lattices]
refs:
  - https://en.wikipedia.org/wiki/Data-flow_analysis
  - https://suif.stanford.edu/~courses/cs243/
---

A dataflow analysis is three things plus a loop. A **lattice** of facts
with a meet operator, a **transfer function** per instruction or block,
and a **direction**; the loop then iterates until nothing changes — the
{{c1::least fixpoint::the most precise solution the framework can
prove}}.

Termination is guaranteed by two properties together: the lattice has
{{c2::finite height::no infinite descending chains}}, and every transfer
function is {{c3::monotone::x ⊑ y implies f(x) ⊑ f(y), so information
only ever moves one way}}. Facts can then only move down the lattice a
bounded number of times. Precision comes from a third property,
{{c4::distributivity::f(x ⊓ y) = f(x) ⊓ f(y)}}, which is what makes the
iterative solution equal to the meet-over-all-paths answer; constant
propagation famously lacks it, so the iterative result is a safe
approximation rather than the ideal one.

The **worklist** is the implementation: instead of sweeping every block
each round, re-enqueue only the {{c5::successors::predecessors, for a
backward analysis}} of a block whose output changed. Keyed by reverse
postorder number, it converges in a handful of passes.

Two orthogonal axes name the analyses: forward/backward, and may/must.
Reaching definitions is forward-may (meet is union), available
expressions is forward-must (meet is intersection, so the initial value
is "everything" and blocks narrow it), liveness is backward-may, and
very-busy expressions is backward-must.
