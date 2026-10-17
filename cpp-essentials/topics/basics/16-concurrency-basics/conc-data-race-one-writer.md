---
id: conc-data-race-one-writer
kind: basic
version: 1
level: 1
tags: [concurrency, threads, undefined-behaviour]
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

## Threads A and B run at the same time. Only B ever writes. Is there a data race on `limit`?

---

**Yes: one writer plus one other access, unordered, is already a data race.**

A data race is two accesses to the same object from different threads,
at least one a write, not both atomic, with nothing (a lock, a `join`)
ordering them. A program with a data race has undefined behaviour,
whatever value A happens to read.
