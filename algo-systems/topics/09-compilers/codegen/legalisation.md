---
id: compiler-legalisation
kind: basic
version: 1
level: 4
tags: [compilers, codegen, llvm]
requires:
  - compiler-backend-phases
refs:
  - https://llvm.org/docs/CodeGenerator.html#selectiondag-legalizetypes-phase
  - https://llvm.org/docs/GlobalISel/Legalizer.html
elaborate: A `<3 x float>` vector reaches a target whose vector registers hold four floats. What might legalisation do with it?
---

## The IR multiplies two `i128` values, and x86-64 has no 128-bit multiply. What does the back end do before selecting instructions?

---

**Legalisation expands it into operations the target has: 64-bit multiplies and adds.**

Instruction selection assumes every type and operation maps to some
machine instruction pattern. Legalisation guarantees that by expanding,
splitting or promoting what the target lacks, so the selector's patterns
only ever see legal input.
