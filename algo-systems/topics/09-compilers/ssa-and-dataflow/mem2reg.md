---
id: compiler-mem2reg
kind: basic
version: 1
level: 4
tags: [compilers, ssa, llvm, memory]
requires:
  - compiler-ssa-form
refs:
  - https://llvm.org/docs/Passes.html#mem2reg-promote-memory-to-register
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/Transforms/Utils/PromoteMemoryToRegister.cpp
elaborate: Passing `&x` to an opaque function keeps `x` in memory. What does every later read of `x` then cost?
---

## Clang emits every local as an `alloca` accessed by `load`/`store`. Which of those locals can `mem2reg` turn into SSA values?

---

**Those whose every use is a plain whole-value `load` or `store`.**

Then no pointer can reach the slot behind the pass's back, so each load
becomes the value last stored, with φs at merges. Not escaping is not
enough: a struct or array accessed through GEPs needs SROA first, which
splits it into scalar allocas; at `-O2` SROA does both.
