---
id: conc-pick-sync-tool
kind: basic
version: 1
level: 3
tags: [concurrency, threads, recognition]
requires:
  - conc-join-waits-trace
  - conc-atomic-or-mutex
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/join
  - https://eel.is/c++draft/thread.thread.member
elaborate: Change one fact in this situation so that `join()` alone is no longer enough, and say which tool you would then add.
---

## One worker thread adds 1 000 numbers into a global `int total`. `main` reads `total` once, after the worker has finished; no other thread touches it. Of `join()`, a `std::mutex` and `std::atomic<int>`, which is needed?

---

**Only `join()`: it orders all the worker's writes before `main`'s read.**

A mutex or an atomic is for accesses that can overlap in time. Here
none do once `main` joins before reading, so there is nothing to
guard, and either tool would only add a cost to each of the 1 000
additions.
