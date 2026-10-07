---
id: compiler-backend-phases
kind: basic
version: 2
level: 2
tags: [compilers, codegen, llvm]
refs:
  - https://llvm.org/docs/CodeGenerator.html#high-level-design-of-the-code-generator
---

## LLVM's back end turns optimised IR into machine code. Name the phase that picks target instructions, then the later one that assigns physical registers.

---

**Instruction selection, over unlimited virtual registers; then register allocation.**

```
LLVM IR
 → instruction selection   (legalise, then match target instructions)
 → scheduling
 → SSA machine-code optimisations
 → register allocation     (virtual → physical, spill the rest)
 → prologue/epilogue, emission
```

Selection can ignore register pressure because registers are still
virtual; allocation fits them into the target's few, spilling to stack
slots.
