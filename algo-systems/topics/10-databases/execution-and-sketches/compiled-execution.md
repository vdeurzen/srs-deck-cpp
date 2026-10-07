---
id: db-compiled-execution
kind: basic
version: 1
level: 5
tags: [databases, execution, compilers]
requires:
  - db-vectorised-batch
refs:
  - https://www.vldb.org/pvldb/vol4/p539-neumann.pdf
  - https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf
elaborate: Umbra replaced LLVM with its own backend for most queries. Which cost of compiled execution was it attacking, and for which queries does it matter most?
---

## HyPer compiles each query pipeline into one loop. What does a tuple avoid there that a vectorised engine still pays for?

---

**Materialisation between operators: the tuple stays in registers from scan to aggregation.**

A vectorised primitive writes its output vector to cache for the next
one to read back. Compiled code pays in compilation latency instead:
HyPer used LLVM, Umbra its own fast backend, Spark generated Java.
