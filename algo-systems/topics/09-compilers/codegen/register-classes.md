---
id: compiler-register-classes
kind: basic
version: 1
level: 4
tags: [compilers, codegen, registers, x86]
requires:
  - compiler-allocation-vocabulary
refs:
  - https://llvm.org/docs/CodeGenerator.html
  - https://www.intel.com/content/www/us/en/developer/articles/technical/intel-sdm.html
elaborate: An integer is live across a hot loop where all general-purpose registers are taken but vector registers are free. What could an allocator do besides spill it to the stack?
---

## x86-64 has 16 general-purpose and 16 XMM registers. Why does a graph-colouring allocator not colour with K = 32?

---

**Each value may only take registers of its own class, so each class is
coloured with its own K.**

An integer address cannot live in `XMM3` and a `float` vector cannot live
in `RBX`, so the two kinds of value never compete for the same colours.
Pressure on general-purpose registers causes spills even while every
vector register is free.
