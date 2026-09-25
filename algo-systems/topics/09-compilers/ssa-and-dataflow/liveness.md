---
id: compiler-liveness
kind: basic
version: 1
level: 4
tags: [compilers, dataflow, registers]
refs:
  - https://en.wikipedia.org/wiki/Live-variable_analysis
  - https://suif.stanford.edu/~courses/cs243/
---

## Write the liveness equations, say which direction they run, and name the two consumers that cannot work without them.

---

A variable is **live** at a point if some path from there uses it before
redefining it. Per block:

    live_out(b) = ⋃ live_in(s) for each successor s
    live_in(b)  = use(b) ∪ (live_out(b) − def(b))

where `use(b)` is the variables read before being written in `b`, and
`def(b)` those written in `b`. It is a **backward** analysis (facts flow
from successors) and a **may** analysis (meet is union — live on *any*
path is live), so the worklist visits blocks in postorder and the
initial value is the empty set.

The two consumers:

- **Register allocation.** Two values interfere if one is live at the
  definition of the other, so liveness *is* the interference graph. It
  also determines where spills must reload and how long a live range
  is, which drives every allocator decision.
- **Dead code elimination.** An assignment whose target is not live
  afterwards, and whose right-hand side has no side effects, is dead.
  Iterating that (removing a dead store can make its operands' defs
  dead) is one of the cheapest large wins in a pipeline.

Implementation notes that matter at scale. Represent the sets as **bit
vectors** indexed by variable, so the equations are OR and AND-NOT over
machine words; for very large functions, switch to sparse sets. In SSA
form you can skip the dense analysis altogether and compute liveness
**per value** by walking its uses up the dominator tree ("liveness
without dataflow", Boissinot et al.), which is faster and easier to
keep incrementally correct while the IR is being changed.

Two subtleties that bite: a φ's operand is live at the **end of the
corresponding predecessor block**, not at the top of the φ's block —
get this wrong and the allocator will happily assign one register to two
simultaneously live values. And a call clobbers caller-saved registers,
so anything live across a call must be in a callee-saved register or
spilled — which is why "live across a call" is the most expensive
property a value can have.
