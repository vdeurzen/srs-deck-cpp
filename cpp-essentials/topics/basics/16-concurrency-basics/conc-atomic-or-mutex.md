---
id: conc-atomic-or-mutex
kind: basic
version: 1
level: 2
tags: [concurrency, threads]
requires:
  - conc-atomic-int-intro
  - conc-mutex-takes-turns
elaborate: Say what change to the counter's job would make you switch from the atomic to a mutex.
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/thread/mutex
---

## A hit counter is one `int` that many threads only increment. Why prefer `std::atomic<int>` over an `int` guarded by a `std::mutex`?

---

**No thread blocks or sleeps: each increment is one indivisible instruction.**

That holds on mainstream hardware. With a mutex, a thread that finds it
held blocks until it is free, and every increment pays a lock and an
unlock.
