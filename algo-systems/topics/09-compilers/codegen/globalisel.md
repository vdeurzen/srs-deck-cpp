---
id: compiler-globalisel
kind: basic
version: 1
level: 5
tags: [compilers, codegen, llvm]
requires:
  - compiler-isel-dag
refs:
  - https://llvm.org/docs/GlobalISel/index.html
  - https://llvm.org/docs/CodeGenerator.html#instruction-selection-section
elaborate: A compare in one block feeds a branch in another. Which selector can fold the two into one machine instruction pair, and why?
---

## LLVM's SelectionDAG builds one DAG per basic block. What scope does GlobalISel select over instead?

---

**The whole function, directly on generic machine IR.**

Per-block DAGs lose patterns that cross blocks and cost a separate IR
to build. GlobalISel's passes (IRTranslator, Legalizer, RegBankSelect,
InstructionSelect) work on MIR throughout. It is meant to replace both
SelectionDAG and FastISel, target by target.
