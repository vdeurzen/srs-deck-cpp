---
id: threads-pick-sleep-until-work
kind: basic
version: 1
level: 3
tags: [concurrency, threads, mixed-recognition]
requires:
  - conc-condition-variable-intro
  - atomics-memory-order-intro
  - conc-mutex-takes-turns
elaborate: Say in one sentence what the waiting thread would cost if it looped on the shared state instead, for example on a laptop running on battery.
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable
  - https://en.cppreference.com/w/cpp/atomic/atomic
---

## A worker thread must use no CPU while idle, until another thread pushes a job onto a shared `std::vector<int>`. Which standard primitive does the sleeping?

---

**A `std::condition_variable`, waited on with its mutex and a predicate.**

The cue is "sleep until shared state changes". A mutex alone only takes
turns; it cannot wait for a condition. An atomic flag with acquire loads
would make the worker spin, burning CPU while idle.
