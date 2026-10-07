---
id: db-compiled-vs-vectorised
kind: basic
version: 1
level: 5
tags: [databases, execution, compilers]
requires:
  - db-compiled-execution
refs:
  - https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf
---

## Compiled (HyPer) versus vectorised (DuckDB) execution: what is the deciding difference between them?

---

**Where intermediates live: registers in one fused loop, or cache-resident vectors between primitives.**

Kersten et al. (VLDB 2018) found compiled code wins compute-heavy
pipelines, while vectorised primitives win memory-bound hash probes:
their independent iterations overlap cache misses. Vectorised needs no
compilation step.
