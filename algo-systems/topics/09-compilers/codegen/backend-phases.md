---
id: compiler-backend-phases
kind: basic
version: 3
level: 2
tags: [compilers, codegen, llvm]
refs:
  - https://llvm.org/docs/CodeGenerator.html#high-level-design-of-the-code-generator
---

## LLVM's code generator runs both instruction selection and register allocation. Why must instruction selection run first?

---

**It needs no physical registers: it uses unlimited virtual registers, and allocation needs the chosen instructions.**

```
LLVM IR
 → instruction selection   (legalise, then match target instructions)
 → scheduling
 → SSA machine-code optimisations
 → register allocation     (virtual → physical, spill the rest)
 → prologue/epilogue, emission
```

Selection can ignore register pressure because registers are still
virtual; allocation then fits them into the target's few, using the
register classes and constraints the selected instructions impose.
