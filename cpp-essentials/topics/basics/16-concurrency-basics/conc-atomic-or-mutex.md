---
id: conc-atomic-or-mutex
kind: basic
version: 1
level: 2
tags: [concurrency, threads]
requires:
  - conc-single-counter-fix
  - conc-lock-the-counter
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/thread/mutex
---

## A hit counter is one `int` that many threads only increment. Why prefer `std::atomic<int>` over an `int` guarded by a `std::mutex`?

---

**No thread ever waits: on mainstream hardware each increment is one lock-free instruction.**

With a mutex, a thread that finds it held blocks until it is free, and
every increment pays a lock and an unlock. An atomic covers one
object changed in one step; as soon as several values or steps must
change together, the mutex is the tool.
