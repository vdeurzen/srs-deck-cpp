---
id: compiler-ssa-destruction
kind: basic
version: 1
level: 5
tags: [compilers, ssa, codegen]
requires:
  - compiler-ssa-form
  - compiler-allocation-vocabulary
refs:
  - https://doi.org/10.1002/(SICI)1097-024X(19980710)28:8%3C859::AID-SPE188%3E3.0.CO;2-8
  - https://doi.org/10.1109/CGO.2009.19
  - https://llvm.org/docs/CodeGenerator.html
---

## Machines have no φ instruction. What goes wrong with the naive "replace φ with copies in the predecessors" translation?

---

The naive rule — for `x = φ(a from P1, b from P2)`, append `x = a` to
P1 and `x = b` to P2 — breaks in three well-known ways.

**The lost-copy problem.** If a copy is inserted at the end of a
predecessor that has a *critical edge* (an edge from a block with
several successors to a block with several predecessors), the copy
executes on paths that do not go to the φ's block, clobbering a value
still in use. The fix is to **split critical edges** first, giving each
such edge its own block to hold the copy.

**The swap problem.** All φs at the top of a block execute
*simultaneously*, so
`a₂ = φ(b₁,…)` together with `b₂ = φ(a₁,…)` means "swap". Emitting the
copies sequentially — `a = b; b = a` — loses one value. The correct
translation treats the whole φ group as a **parallel copy** and
sequentialises it properly: build the dependency graph of the copies,
emit the ones whose target is nobody's source, and break each remaining
cycle with a temporary (or an `xchg`, or three `xor`s).

**Interference introduced by the copies themselves.** Copy insertion
extends live ranges and can make two ranges interfere that did not
before, so a naive destruction followed by allocation spills more than
necessary.

The modern answer is to **not destroy SSA until after register
allocation**: keep φs through the allocator (whose interference graph
on SSA is chordal, hence optimally colourable), then resolve each φ
into register-to-register moves or spill-slot moves, and finally run
copy coalescing to delete the ones that turned out to be moves from a
register to itself. LLVM does not do this: it destroys SSA *before*
allocation with `PHIElimination`, which splits the critical edges it
needs (all of them only under `-phi-elim-split-all-critical-edges`)
and then inserts the copies, followed by the
`TwoAddressInstructionPass` and the register coalescer to delete the
copies that turn out to be redundant.

The transferable lesson: φ is a *semantic* device that assumes
simultaneity, and the translation to sequential machine code has to
preserve that — the same problem shows up in any parallel-assignment
lowering, from tuple assignment in a language front end to state
updates in a hardware description.
