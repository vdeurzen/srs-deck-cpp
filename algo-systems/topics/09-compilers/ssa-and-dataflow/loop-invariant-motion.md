---
id: compiler-loop-invariant-motion
kind: basic
version: 1
level: 5
tags: [compilers, loops, code-motion, llvm]
requires:
  - compiler-loop-preheader
  - compiler-ssa-dominance-property
refs:
  - https://llvm.org/docs/Passes.html#licm-loop-invariant-code-motion
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/Transforms/Scalar/LICM.cpp
elaborate: "`t = a / b` is invariant, but the loop guards it with `if (b != 0)`. What extra condition must hold before LICM may hoist it?"
---

## LICM hoists `t = a * b` from a loop body into the preheader. What makes it loop-invariant?

---

**Each operand is defined outside the loop or is itself loop-invariant.**

Then it computes the same value on every iteration. A multiply cannot
trap, so running it even when the loop runs zero times is harmless. A
load or divide must also be safe to speculate, or be guaranteed to
execute.
