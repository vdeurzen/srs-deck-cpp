---
id: compiler-sccp
kind: basic
version: 1
level: 5
tags: [compilers, ssa, dataflow, optimisation]
requires:
  - compiler-ssa-form
  - compiler-worklist-dataflow
refs:
  - https://dl.acm.org/doi/10.1145/103135.103136
  - https://llvm.org/docs/Passes.html
---

## What does sparse *conditional* constant propagation do that running constant propagation and dead-branch elimination separately cannot?

---

It solves both problems **at once**, and the interleaving finds
constants neither pass finds alone.

The lattice per SSA value has three levels: ⊤ "not yet known to be
anything" (optimistic), a specific constant, and ⊥ "not constant". The
algorithm keeps **two worklists** — one of SSA edges (a value changed,
so re-evaluate its users) and one of CFG edges (a block became
reachable, so evaluate it) — and crucially it **only evaluates
instructions in blocks it has proved reachable**, and only merges φ
operands arriving on **executable** edges.

That is where the extra power comes from. A φ whose only executable
incoming edge carries the constant 4 evaluates to 4, rather than to ⊥
as it would if all predecessors were assumed live. Proving that a
branch condition is constant marks one successor edge unreachable,
which can make a φ downstream constant, which can make another branch
constant. Running the two passes in sequence — constants, then
unreachable code, then constants again — needs repeated rounds and
still cannot match it, because it starts each round pessimistically.

The **optimistic** initialisation (start at ⊤, assume unreachable
until proven otherwise) is the other half. It lets values inside a loop
be proved constant even though their φ depends on the loop's own
back edge: the back edge is only merged once it is known executable and
the value coming round it is known. A pessimistic analysis has to
assume ⊥ there.

Two properties to remember. It is **sparse**: work is proportional to
SSA edges actually re-evaluated, not to blocks × variables, and the
lattice's finite height (⊤, constants, ⊥ — at most two lowerings per
value) bounds the iterations. And it is a general template: substitute another
finite-height lattice for "constant" — known bits, value ranges,
nullness, type refinement — and you get range propagation and the
family of sparse conditional analyses a modern optimiser is mostly
built from.
