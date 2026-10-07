---
id: compiler-instruction-scheduling
kind: basic
version: 2
level: 5
tags: [compilers, codegen, scheduling, dags]
requires:
  - compiler-dependence-dag
refs:
  - https://en.wikipedia.org/wiki/Instruction_scheduling
  - https://www.agner.org/optimize/
elaborate: On a wide out-of-order x86 core, the hardware reorders too. Where does the compiler's schedule still matter?
---

## A list scheduler has several ready instructions this cycle. Which does it issue first, by the classic priority?

---

**The one with the longest latency-weighted path to the end of the DAG.**

That is the critical path: delaying its head delays the finish. Ties
break on register pressure or source order. Optimal DAG scheduling is
NP-complete, so this greedy loop is what compilers ship.
