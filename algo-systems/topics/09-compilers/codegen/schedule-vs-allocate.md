---
id: compiler-schedule-vs-allocate
kind: basic
version: 1
level: 5
tags: [compilers, codegen, scheduling, registers]
requires:
  - compiler-instruction-scheduling
  - compiler-allocation-vocabulary
refs:
  - https://llvm.org/doxygen/classllvm_1_1ScheduleDAGMILive.html
  - https://github.com/llvm/llvm-project/blob/main/llvm/lib/CodeGen/TargetPassConfig.cpp
elaborate: Allocating first avoids the extra spills. What does the allocator's register reuse then do to the scheduler's freedom?
---

## A scheduler hoists four loads to the top of a loop to hide their latency. Why can the loop get slower?

---

**More values are live at once, so the allocator runs out of registers and spills.**

The spills add loads and stores of their own. So LLVM's pre-allocation
machine scheduler tracks register pressure and backs off as it nears
the register count; whether a second pass runs after allocation depends
on the target and CPU.
