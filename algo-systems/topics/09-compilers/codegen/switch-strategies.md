---
id: compiler-switch-strategies
kind: basic
version: 1
level: 4
tags: [compilers, codegen, branches]
refs:
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/SwitchLoweringUtils.cpp
  - https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/CodeGen/TargetLowering.h
elaborate: A jump table's indirect branch mispredicts on irregular input. When could a short compare chain beat it?
---

## Which property of a `switch`'s case values decides between a jump table and a tree of compares?

---

**Density: how much of the range from the lowest to the highest case is
filled.**

A dense cluster becomes a jump table: one bounds check and one indirect
branch. Sparse cases would make the table mostly holes, so LLVM gives
them a balanced tree of compares instead, O(log n) branches deep.
