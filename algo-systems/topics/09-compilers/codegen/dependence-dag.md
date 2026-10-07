---
id: compiler-dependence-dag
kind: basic
version: 1
level: 4
tags: [compilers, codegen, scheduling, dags]
requires:
  - graph-topological-order
refs:
  - https://en.wikipedia.org/wiki/Instruction_scheduling
  - https://llvm.org/doxygen/classllvm_1_1ScheduleDAG.html
  - https://en.algorithmica.org/hpc/cpu-cache/latency/
elaborate: Register renaming in an out-of-order core removes most anti-dependences at run time. Why can the compiler's scheduler not assume the same?
---

## In a scheduler's dependence DAG, `load r1` feeds `add r2, r1`. Why does that edge carry the load's full latency?

---

**The `add` reads `r1`, so it cannot start until the load delivers it.**

That is four or five cycles for an L1 hit. Anti-dependences (a write
after a read) and output dependences (a write after a write) only keep
two uses of one register in order, so they cost about 0.
