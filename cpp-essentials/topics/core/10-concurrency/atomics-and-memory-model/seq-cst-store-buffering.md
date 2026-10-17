---
id: atomics-seq-cst-store-buffering
kind: basic
version: 1
level: 3
tags: [concurrency, atomics, memory-model]
requires:
  - atomics-synchronizes-with
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/atomics.order
---

## `x` and `y` start at 0. Thread 1: `x.store(1); r1 = y.load();` Thread 2: `y.store(1); r2 = x.load();` All four `seq_cst`. Can the run end with `r1 == 0 && r2 == 0`?

---

**No.** `seq_cst` operations form one total order, consistent with
*strongly happens-before*, that every thread agrees on; whichever store comes
first precedes the other thread's load, which must then see it.

Downgrade any of the four to acquire/release and `0, 0` is allowed:
nothing orders a store before a *later* load of another object — the
store-buffer reordering x86 really performs.
