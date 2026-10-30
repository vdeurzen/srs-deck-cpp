---
id: compiler-caller-saved
kind: basic
version: 1
level: 5
tags: [compilers, codegen, registers, abi]
requires:
  - compiler-allocation-vocabulary
refs:
  - https://gitlab.com/x86-psABIs/x86-64-ABI
  - https://llvm.org/docs/CodeGenerator.html#register-allocator
elaborate: A small leaf function uses only caller-saved registers. Why does it need no prologue saves at all?
---

## A value is live across a call. In which registers can it stay without a save and restore around the call?

---

**Only callee-saved ones.**

The call clobbers every caller-saved register, so each one interferes
with every range live across the call. Callee-saved ones (on x86-64
System V the six `rbx`, `rbp`, `r12`–`r15`) cost one save in the
prologue instead.
