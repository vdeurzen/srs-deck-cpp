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
elaborate: Why does LLVM eliminate φs before allocating, when SSA interference graphs are the easy ones to colour?
---
An interviewer asks how a back end with a Chaitin–Briggs colouring
allocator gets from machine code with φs and virtual registers to
machine code with physical registers. Answer aloud.
---
- [ ] φs are eliminated first into copies in the predecessors, which the coalescer deletes where the ranges do not interfere
- [ ] Liveness builds the interference graph: ranges interfere when one is live at the other's definition
- [ ] Simplify removes nodes with fewer than K neighbours; when stuck it pushes one optimistically, spilled only if select fails
- [ ] A range live across a call needs a callee-saved register, saved once in the prologue, or spills around it
- [ ] Before spilling a whole range the allocator splits it, so spill code lands only where pressure is high
