---
id: compiler-llvm-phi-elimination
kind: basic
version: 1
level: 5
tags: [compilers, ssa, codegen, llvm]
requires:
  - compiler-ssa-destruction
refs:
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/PHIElimination.cpp
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/TargetPassConfig.cpp
elaborate: An SSA-based allocator keeps the φs until after colouring. What does LLVM give up by not doing that?
---

## Where does LLVM's optimising code generator eliminate φs, relative to register allocation?

---

**Before it: `PHIElimination`, then the two-address pass and the register coalescer, then the allocator.**

`PHIElimination` splits the critical edges it needs (all of them only
with `-phi-elim-split-all-critical-edges`) and inserts copies. The
coalescer deletes the copies whose ranges turn out not to interfere.
