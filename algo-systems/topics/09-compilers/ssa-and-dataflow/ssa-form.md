---
id: compiler-ssa-form
kind: basic
version: 1
level: 4
tags: [compilers, ssa, ir]
refs:
  - https://dl.acm.org/doi/10.1145/115372.115320
  - https://llvm.org/docs/LangRef.html
---

## What is SSA form, what is a φ-function, and which analyses become trivial because of it?

---

**Every value is assigned exactly once**, and every use names the single
definition it reads. Where control flow merges and a variable could
come from either branch, a **φ-function** `x₃ = φ(x₁ from B1, x₂ from
B2)` selects by incoming edge. φ is not a real instruction: it is a
notation for "this value depends on which predecessor we came from",
executed conceptually on the edge, and all φs at the top of a block
execute simultaneously.

What it buys:

- **Def–use chains are explicit and exact.** A use points at its one
  definition, so constant propagation, copy propagation and dead code
  elimination become graph walks instead of dataflow fixpoints over the
  CFG. "Is this value dead?" is "does it have zero uses?".
- **No false dependencies.** Reusing a variable name for unrelated
  purposes — the classic `i` reused in three loops — is disambiguated
  into distinct values, so nothing conservatively merges information
  that should not be merged.
- **Sparse analyses.** Because information flows along def–use edges
  rather than through every block, an analysis only visits the
  instructions that matter, which is the difference between SCCP and a
  dense iterative constant propagation.
- **Value identity is a pointer.** In LLVM, an SSA value *is* the
  instruction that computes it, so GVN, CSE and hash-consing compare
  and hash instructions directly.

What it does not handle by itself is memory. `store`/`load` are not in
SSA — aliasing means you cannot name "the value in that location" — so
compilers either keep memory out of SSA and rely on alias analysis, or
promote it *into* SSA where they can (LLVM's `mem2reg`, which turns
`alloca`+`load`/`store` of non-escaping locals into SSA values, and is
by some distance the single highest-value pass in a naive front end's
pipeline).

The two questions that follow are where the machinery lives: *where*
must φs go (the iterated dominance frontier) and *how* do you get out
of SSA again (φ-elimination into parallel copies).
