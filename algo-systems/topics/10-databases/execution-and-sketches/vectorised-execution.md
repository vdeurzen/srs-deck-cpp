---
id: db-vectorised-execution
kind: basic
version: 2
level: 4
tags: [databases, execution, compilers]
requires:
  - foundations-branch-misprediction
refs:
  - https://dl.acm.org/doi/10.1109/69.273032
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
elaborate: A tree-walking interpreter has the same overhead. What does a bytecode VM change about it, and what does a JIT change after that?
---

## Why is Volcano-style, tuple-at-a-time execution slow on a modern CPU?

---

**Every operator makes an indirect `next()` call per row: dispatch costs dwarf the work.**

Tens of cycles of calls and interpreted expressions surround a few
cycles of arithmetic per row, and with one row per call there is no loop
over data to vectorise. The remedy: return a batch of values per call.
