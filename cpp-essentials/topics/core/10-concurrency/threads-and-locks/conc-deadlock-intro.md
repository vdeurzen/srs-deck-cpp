---
id: conc-deadlock-intro
kind: basic
version: 1
level: 1
tags: [concurrency, threads, mutex]
requires:
  - conc-mutex-takes-turns
refs:
  - https://en.cppreference.com/w/cpp/thread/mutex
  - https://en.cppreference.com/w/cpp/thread/scoped_lock
elaborate: Pick two locks your own code takes together. Say in one sentence what order every caller takes them in, and who enforces it.
---

```cpp
std::mutex a, b;

void one() { a.lock(); b.lock(); /* ... */ b.unlock(); a.unlock(); }
void two() { b.lock(); a.lock(); /* ... */ a.unlock(); b.unlock(); }
```

## Thread 1 runs `one` and thread 2 runs `two`. Each has just returned from its first `lock()`. What happens next?

---

**Both block forever: each waits for the mutex the other holds (a deadlock).**

Thread 1 holds `a` and waits for `b`; thread 2 holds `b` and waits for
`a`. Neither can unlock. Fix: one lock order for every thread, or
`std::scoped_lock lk(a, b);`, which locks both without deadlocking.
