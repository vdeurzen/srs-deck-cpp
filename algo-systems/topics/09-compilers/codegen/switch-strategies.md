---
id: compiler-switch-strategies
kind: basic
version: 1
level: 4
tags: [compilers, codegen, branches]
requires:
  - compiler-switch-lowering
refs:
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/SwitchLoweringUtils.cpp
  - https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/CodeGen/TargetLowering.h
elaborate: A jump table's indirect branch mispredicts on irregular input. When could a short compare chain beat it?
---

## Which property of a `switch`'s case values decides between a jump table and a tree of compares?

---

**Density: cases filling most of their range get a jump table; sparse
cases get a balanced tree of compares.**

LLVM's instruction-selection lowering first groups cases into clusters,
then picks per cluster. A cluster whose range fits in a machine word and
has at most three destinations (and enough cases to pay) becomes a bit test instead.
