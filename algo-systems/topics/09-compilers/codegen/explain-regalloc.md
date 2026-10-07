---
id: compiler-explain-regalloc
kind: explain
version: 1
level: 5
tags: [compilers, codegen, registers, interview]
requires:
  - compiler-llvm-phi-elimination
  - compiler-live-range-splitting
  - compiler-caller-saved
refs:
  - https://llvm.org/docs/CodeGenerator.html#register-allocator
  - https://dl.acm.org/doi/10.1145/177492.177575
---
Explain how a back end with a Chaitin–Briggs colouring allocator gets
from machine code with φs and virtual registers to machine code with
physical registers.
---
- [ ] φs go first, because LLVM and GCC allocate on non-SSA code: LLVM copies each incoming value into a fresh virtual register at the end of its predecessor (splitting critical edges where a copy would run on the wrong path) and leaves the coalescer to delete copies whose ranges do not interfere
- [ ] Liveness gives the interference graph: two ranges interfere when one is live at the other's definition, and K registers means K-colouring it
- [ ] Simplify removes nodes with fewer than K neighbours left, since they always find a colour; when stuck, one is pushed optimistically and only spilled if select finds no free colour
- [ ] A call clobbers every caller-saved register, so a range live across it must take a callee-saved register (saved once in the prologue) or be spilled around the call
- [ ] Before spilling a whole range the allocator splits it, keeping registers where pressure allows and spill code only where it does not (as LLVM's greedy allocator does)
