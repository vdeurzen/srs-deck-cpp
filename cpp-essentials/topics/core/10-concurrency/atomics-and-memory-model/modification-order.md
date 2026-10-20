---
id: atomics-modification-order
kind: basic
version: 2
level: 1
tags: [concurrency, atomics, memory-model]
requires:
  - atomics-memory-order-intro
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/intro.races
elaborate: Say in one sentence, as to an interviewer, what `memory_order_relaxed` still promises and what it gives up.
---

`std::memory_order_relaxed` keeps each operation atomic but orders no
other memory access.

```cpp
std::atomic<int> x{0};
const auto relaxed = std::memory_order_relaxed;
void a() { x.store(1, relaxed); x.store(2, relaxed); }        // thread A
void b() { int r1 = x.load(relaxed); int r2 = x.load(relaxed); } // thread B
```

## A and B run at the same time. Can B end with `r1 == 2` and `r2 == 1`?

---

**No: all writes to `x` form one modification order (0, 1, 2) that every thread reads along.**

A later load in B never reads an earlier write in that order than the
load before it did, whatever `memory_order` either side passes. What
`relaxed` gives up is ordering against *other* objects, such as a
plain `int` written next to `x`.
