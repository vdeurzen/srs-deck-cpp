---
id: compiler-explain-linear-scan
kind: explain
version: 2
level: 5
tags: [compilers, codegen, registers, jit, interview]
requires:
  - compiler-linear-scan-holes
  - compiler-linear-scan-spill
refs:
  - https://dl.acm.org/doi/10.1145/330249.330250
  - https://dl.acm.org/doi/10.1145/1772954.1772979
elaborate: When would you still pick graph colouring over linear scan, even in a JIT?
---
An interviewer asks how the linear-scan register allocator in a JIT
works. Answer aloud.
---
- [ ] A JIT pays compile time at run time, so linear scan skips the interference graph, walking intervals once by start
- [ ] An active list holds the intervals in registers; each new start first expires those that have ended
- [ ] The new interval takes a free register; with none free, whichever interval ends furthest away spills
- [ ] Poletto and Sarkar measured it several times faster than colouring, for code at most about 10 % slower
- [ ] One interval per value counts lifetime holes as live; HotSpot's client compiler keeps holes and splits intervals instead
