---
id: db-vectorised-execution
kind: basic
version: 1
level: 5
tags: [databases, execution, simd, compilers]
refs:
  - https://www.cidrdb.org/cidr2005/papers/P19.pdf
  - https://www.vldb.org/pvldb/vol11/p2209-kersten.pdf
---

## Volcano, vectorised, and compiled execution: what is the per-row overhead in each, and why did the field land on the last two?

---

**Volcano / tuple-at-a-time**: every operator implements `next()`
returning one tuple. Clean and composable, and the cost is brutal —
one virtual call per operator per *row*, an interpreted expression
tree per predicate, and no chance of vectorisation. Tens to hundreds of
cycles of overhead for a few cycles of real work.

**Vectorised** (MonetDB/X100, DuckDB, ClickHouse, Velox): `next()`
returns a **batch** of values per column — ~1024 in X100, 2048 in
DuckDB (ClickHouse's blocks are far larger). The virtual call is
amortised over a thousand rows, the inner loop over a primitive
(`add_int32_vec`, `compare_lt_vec`) is a tight, branch-free, SIMD-able
loop over contiguous memory, and intermediate results fit in L1/L2 by
construction. Predicates produce **selection vectors** rather than
branching per row. Typically 10–100× faster than tuple-at-a-time, for
a moderate implementation cost: you write a kernel per (operation,
type) pair.

**Compiled** (HyPer via LLVM, Umbra via its own IR and a custom
single-pass backend with LLVM only for the optimising tier, Spark's
whole-stage codegen via generated Java that Janino and the JVM's JIT
compile): generate code for the whole pipeline, so a tuple stays in
registers from the scan to the aggregation with no materialisation
between operators at all. Best possible data movement; costs are
compilation latency (mitigated by an interpreter for short queries and
adaptive switching) and considerably harder debugging and profiling.

The comparison in the "everything you always wanted to know" paper is
the useful summary: compiled execution wins where a pipeline is
compute-heavy and can keep values in registers, vectorised wins where
the work is memory-bound and per-primitive SIMD matters, and the
difference is much smaller than either camp's marketing. Recent systems
converge on hybrids — compiled pipelines that call vectorised
primitives.

Two things worth transferring beyond databases. The **batch size is
chosen to fit the cache, not the problem** — 1024 rows × a few columns
sits in L1 or L2, which is the same reason tiling works in
numerics. And "amortise dispatch over a batch" is the general cure for
interpretation overhead: the same move turns a slow tree-walking
interpreter into a bytecode VM, and a bytecode VM into a JIT.
