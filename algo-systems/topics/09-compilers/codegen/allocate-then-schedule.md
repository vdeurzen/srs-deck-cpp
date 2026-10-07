---
id: compiler-allocate-then-schedule
kind: basic
version: 1
level: 5
tags: [compilers, codegen, scheduling, registers]
requires:
  - compiler-dependence-dag
  - compiler-allocation-vocabulary
refs:
  - https://en.wikipedia.org/wiki/Instruction_scheduling
  - https://llvm.org/doxygen/classllvm_1_1ScheduleDAGMILive.html
elaborate: An out-of-order core renames registers in hardware. Which of these new dependences does that remove at run time, and which does the compiler still pay for?
---

## The allocator puts `a` in `r1`, and later reuses `r1` for an unrelated `b`. What does that do to a scheduler that runs afterwards?

---

**It adds an anti-dependence: `b`'s write to `r1` must stay after the last read of `a`.**

Before allocation `a` and `b` were independent and could be reordered
freely. Register reuse turns them into one storage location, so the
scheduler loses that freedom.
