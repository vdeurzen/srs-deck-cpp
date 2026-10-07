---
id: compiler-llvm-uniquing
kind: basic
version: 1
level: 5
tags: [compilers, ir, hashing, llvm]
requires:
  - compiler-hash-consing
refs:
  - https://llvm.org/docs/ProgrammersManual.html#the-core-llvm-class-hierarchy-reference
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/IR/LLVMContextImpl.h
elaborate: Comparing two LLVM types with `==` is a pointer comparison. What would break if a pass could mutate a type in place?
---

## LLVM does not hash-cons its instructions. Which parts of its IR does it unique instead?

---

**Constants, types, attributes and uniqued metadata: the immutable parts.**

`LLVMContext` uniques them, so equal ones are one object. Instructions
are edited in place by every pass, which sharing would forbid, so
redundancy among them is left to GVN as a pass.
