---
id: compiler-live-range-splitting
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, llvm]
requires:
  - compiler-graph-colouring
refs:
  - https://blog.llvm.org/2011/09/greedy-register-allocation-in-llvm-30.html
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/RegAllocGreedy.cpp
elaborate: Splitting adds copies at the split points. Which pass then tries to remove them?
---

## A value is used in a hot loop and once after a call far away. Under pressure, what do modern allocators try before giving the whole range a stack slot?

---

**Split it: keep a register through the loop, and spill only around the call.**

Spilling a whole range makes every use a memory access. Splitting cuts
it into pieces allocated separately, joined by copies or reloads.
LLVM's default greedy allocator splits ranges before it falls back to
spilling.
