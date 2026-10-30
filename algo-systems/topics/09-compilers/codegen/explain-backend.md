---
id: compiler-explain-backend
kind: explain
version: 3
level: 5
tags: [compilers, codegen, interview]
requires:
  - compiler-explain-isel
  - compiler-explain-regalloc
  - compiler-phi-swap
refs:
  - https://llvm.org/docs/CodeGenerator.html
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/TargetPassConfig.cpp
elaborate: After allocation the back end still lays out blocks and relaxes branches. Why can a branch's encoding only be chosen once the layout is fixed?
---
An interviewer shows this hot loop, compiled at `-O2` for x86-64 under
the System V ABI, with `x` and `y` of type `long`:

```cpp
for (long i = 0; i < n; ++i) {
    std::swap(x, y);
    log_value(a[i] + b[i] + c[i] + x);
}
```

What does fitting this loop's values into registers cost, and why?
Answer aloud.
---
- [ ] Selection folds `base + i*8` into each load's addressing mode, so no address needs a register of its own
- [ ] The swap's two φs read each other's old values, so `x` and `y` interfere and their copies stay as moves
- [ ] The call clobbers every caller-saved register, so all seven values live across it need callee-saved registers
- [ ] A callee-saved register costs one save and restore per call of the function, not per iteration
- [ ] System V has only six callee-saved general registers, so one value spills, and splitting reloads it each iteration
