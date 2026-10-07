---
id: compiler-explain-backend
kind: explain
version: 2
level: 5
tags: [compilers, codegen, interview]
requires:
  - compiler-explain-isel
  - compiler-explain-regalloc
  - compiler-explain-scheduling
refs:
  - https://llvm.org/docs/CodeGenerator.html
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/TargetPassConfig.cpp
elaborate: After allocation the back end still lays out blocks and relaxes branches. Why can a branch's encoding only be chosen once the layout is fixed?
---
A hot x86-64 loop at `-O2`, with `x` and `y` of type `long`:

```cpp
for (long i = 0; i < n; ++i) {
    std::swap(x, y);
    log_value(a[i] + b[i] + c[i] + x);
}
```

Walk it from SSA IR to physical registers under the System V ABI: for
each feature of this loop, what does it cause and what does that cost?
---
- [ ] Selection folds `base + i*8` into each load's addressing mode, so the addresses need no registers of their own
- [ ] The swap becomes two header φs, and `x` and `y` are live at the same time, so the coalescer cannot remove their copies: real moves stay in the loop
- [ ] `log_value` clobbers every caller-saved register, so `i`, `n`, `a`, `b`, `c`, `x` and `y`, all live across it, each need a callee-saved register, saved once in the prologue
- [ ] System V has only six callee-saved general registers (`rbx`, `rbp`, `r12`–`r15`), so seven values cannot all fit: one is spilled, and splitting places its reload near the use, once per iteration
- [ ] The reload is a load on the loop's path whose latency the scheduler cannot hide by moving it across the call, which ends a scheduling region
