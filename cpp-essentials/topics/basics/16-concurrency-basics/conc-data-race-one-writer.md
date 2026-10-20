---
id: conc-data-race-one-writer
kind: basic
version: 2
level: 1
tags: [concurrency, threads, undefined-behaviour, misconception]
elaborate: Which variable in your code is set by one thread and only read by another, such as a `stop` flag, and what orders those accesses?
requires:
  - ub-definition
  - conc-data-race-intro
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://eel.is/c++draft/intro.races
---

```cpp
int limit = 10;                        // a global, no lock anywhere

void reader() { if (limit > 5) { /* ... */ } }   // thread A
void writer() { limit = 20; }                    // thread B
```

Many expect that, since only B ever writes, A simply reads `10` or `20`.

## Threads A and B run at the same time. Which values may A's read see, by the standard?

---

**No guarantee at all: the program has a data race, so undefined
behaviour.**

"10 or 20" is tempting because the hardware reads an `int` whole. But
one plain write and one unordered read already race, and the compiler
may assume no other thread writes `limit` (say, read it once and keep
it). Fix: `std::atomic<int>`.
