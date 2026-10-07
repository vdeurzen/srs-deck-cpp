---
id: compiler-loop-preheader
kind: basic
version: 1
level: 4
tags: [compilers, loops, llvm, code-motion]
requires:
  - compiler-natural-loops
refs:
  - https://llvm.org/docs/LoopTerminology.html#loop-simplify-form
  - https://llvm.org/docs/Passes.html#loop-simplify-canonicalize-natural-loops
elaborate: An invariant load is hoisted to the preheader of a loop that runs zero times. What must be true of the load for that to be safe?
---

## LLVM's `LoopSimplify` gives every loop a *preheader* before LICM runs. What is that block for?

---

**A place to hoist loop-invariant code: it runs once per loop entry.**

The preheader is the header's only predecessor outside the loop, and
its only successor is the header, so it dominates the loop without being
part of it. Where a loop has none, `LoopSimplify` inserts one.
