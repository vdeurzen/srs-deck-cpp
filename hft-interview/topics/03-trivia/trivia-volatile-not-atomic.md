---
id: trivia-volatile-not-atomic
kind: basic
version: 1
level: 3
tags: [hft-trivia, concurrency, memory-model, misconception]
requires:
  - cpp-core/threads-data-race-is-ub
refs:
  - https://eel.is/c++draft/intro.races#def:data_race
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/utility/program/sig_atomic_t
elaborate: Besides the flag itself, what else written by the stopping thread might the worker need to see, and what orders it?
---

```cpp
volatile bool stop = false;
void worker()   { while (!stop) poll_feed(); }   // thread 1
void shutdown() { stop = true; }                 // thread 2
```

## Marking `stop` `volatile` made the worker loop exit reliably on x86. Is the program correct?

---

**No: it has a data race, so undefined behaviour.** `volatile`
guarantees only that its accesses aren't elided or reordered relative to
each other. It gives no atomicity and no ordering between threads; only
atomics, fences or locks do. `volatile` is for memory-mapped I/O and
signal handlers. Write `std::atomic<bool> stop`.
