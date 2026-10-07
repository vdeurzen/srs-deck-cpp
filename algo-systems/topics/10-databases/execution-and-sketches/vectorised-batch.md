---
id: db-vectorised-batch
kind: basic
version: 1
level: 4
tags: [databases, execution, memory-hierarchy]
requires:
  - db-vectorised-execution
refs:
  - https://duckdb.org/docs/stable/internals/vector
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
---

## DuckDB's operators pass vectors of 2 048 values per call. What decides that size?

---

**Big enough to amortise each call over thousands of rows, small enough to stay in cache.**

A pipeline's intermediate vectors then live in L1/L2 between primitives.
Passing a whole column instead would write every intermediate result out
to memory and read it back.
