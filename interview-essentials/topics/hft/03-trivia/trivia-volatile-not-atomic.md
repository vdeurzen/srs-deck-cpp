---
id: trivia-volatile-not-atomic
kind: basic
version: 1
level: 3
tags: [hft-trivia, concurrency, memory-model, misconception]
requires:
  - cpp-essentials/threads-data-race-is-ub
  - cpp-essentials/conc-atomic-or-mutex
refs:
  - https://eel.is/c++draft/intro.races#def:data_race
  - https://en.cppreference.com/w/cpp/language/cv
  - https://en.cppreference.com/w/cpp/utility/program/sig_atomic_t
elaborate: Say to an interviewer why this loop can seem to work on x86 in testing, and why that proves nothing.
---

Many expect `volatile` to make a flag safe to share between threads.
`poll_feed()` is any function that reads the market feed.

```cpp
volatile bool stop = false;
void worker()   { while (!stop) poll_feed(); }   // thread 1
void shutdown() { stop = true; }                 // thread 2
```

## Under the C++ standard, what does this program do when both threads run?

---

**It has a data race, so its behaviour is undefined.** `volatile`
only stops the compiler eliding or reordering those accesses among
themselves: no atomicity, no ordering with other threads. Write
`std::atomic<bool> stop`.
