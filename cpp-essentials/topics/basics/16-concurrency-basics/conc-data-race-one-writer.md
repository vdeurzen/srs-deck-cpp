---
id: conc-data-race-one-writer
kind: basic
version: 1
level: 1
tags: [concurrency, threads, undefined-behaviour, misconception]
elaborate: Which variable in your code is set by one thread and only read by another, such as a `stop` flag, and what orders those accesses?
requires:
  - conc-lost-update-trace
refs:
  - https://en.cppreference.com/w/cpp/language/memory_model
  - https://eel.is/c++draft/intro.races
---

```cpp
int limit = 10;                        // a global, no lock anywhere

void reader() { if (limit > 5) { /* ... */ } }   // thread A
void writer() { limit = 20; }                    // thread B
```

## Threads A and B run at the same time. Only B ever writes, so a colleague says A reads either `10` or `20`. What does the standard guarantee about this program?

---

**Nothing: one write plus one unordered read is a data race, which is
undefined behaviour.**

A race needs two accesses from different threads, one a write, not both
atomic, nothing (a lock, a `join`) ordering them. "10 or 20" is tempting
because the hardware reads an `int` whole, but the compiler may assume
no other thread writes `limit`. Fix: `std::atomic<int>`.
