---
id: compiler-switch-thresholds
kind: cloze
version: 1
level: 4
tags: [compilers, codegen, branches, llvm]
requires:
  - compiler-switch-strategies
  - compiler-switch-lowering
refs:
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/TargetLoweringBase.cpp
  - https://github.com/llvm/llvm-project/blob/main/llvm/include/llvm/CodeGen/TargetLowering.h
---

LLVM builds a jump table for a cluster of at least four cases whose
cases fill at least {{c1::10 %::a small percentage}} of their range at
`-O2` (40 % at `-Os`). A cluster whose range fits in a
{{c2::machine word::a size}} and which jumps to at most
{{c3::three::a small count}} distinct destinations becomes a bit test.
