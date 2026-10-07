---
id: compiler-backend-phases
kind: cloze
version: 1
level: 2
tags: [compilers, codegen, llvm]
refs:
  - https://llvm.org/docs/CodeGenerator.html#high-level-design-of-the-code-generator
---

LLVM's back end turns optimised IR into machine code in a fixed order.
{{c1::Instruction selection::a matching phase}} expresses the IR in the
target's instructions, still over an unlimited supply of virtual
registers. {{c2::Register allocation::a later phase}} then maps those
onto the target's few physical registers, spilling the rest to stack
slots. Prologue/epilogue insertion and code emission come last.

---

Selection decides *which* instructions; allocation decides *where*
their values live. Scheduling runs alongside both.
