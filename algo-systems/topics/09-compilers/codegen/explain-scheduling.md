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
elaborate: Optimal scheduling of a DAG is NP-complete. Where else in a back end does that push compilers to a greedy heuristic?
---
An interviewer asks how a compiler back end schedules instructions, and
where that happens relative to register allocation. Answer aloud.
---
- [ ] It builds a dependence DAG whose read-after-write edges carry the producer's latency; anti- and output edges cost about 0
- [ ] List scheduling greedily issues, each cycle, the ready instruction with the longest latency-weighted path to the end
- [ ] Scheduling before allocation hoists loads to hide latency, but more values live at once can force spills
- [ ] Scheduling after allocation meets anti-dependences from register reuse, so values sharing a register cannot be reordered
- [ ] So the main scheduler runs before allocation and backs off near the register count; any post-allocation pass is target-dependent
