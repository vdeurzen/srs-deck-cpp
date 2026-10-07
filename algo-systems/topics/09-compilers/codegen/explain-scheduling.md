---
id: compiler-explain-scheduling
kind: explain
version: 1
level: 5
tags: [compilers, codegen, scheduling, interview]
requires:
  - compiler-schedule-vs-allocate
  - compiler-allocate-then-schedule
refs:
  - https://en.wikipedia.org/wiki/Instruction_scheduling
  - https://llvm.org/doxygen/classllvm_1_1ScheduleDAGMILive.html
---
Explain how and when a back end schedules instructions, and why it does
so more than once.
---
- [ ] The input is a dependence DAG: read-after-write edges carry the producer's latency, while anti- and output dependences only order two uses of a register and cost about 0
- [ ] List scheduling issues, each cycle, the ready instruction with the highest priority, classically the latency-weighted longest path to the end of the DAG, greedily, because optimal DAG scheduling is NP-complete
- [ ] Scheduling before allocation to hide latency moves loads early, so more values are live at once and the allocator may spill, adding memory operations of its own
- [ ] Scheduling after allocation instead meets anti-dependences from register reuse: two independent values sharing a register can no longer be reordered
- [ ] So the main scheduler runs before allocation and tracks register pressure, backing off near the register count; a post-allocation pass is target-dependent
