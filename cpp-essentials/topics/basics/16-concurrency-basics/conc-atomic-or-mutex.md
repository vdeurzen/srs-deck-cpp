---
id: conc-atomic-or-mutex
kind: basic
version: 2
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

```cpp
std::atomic<int> a_hits{0};
void hit_a() { ++a_hits; }

int m_hits = 0;
std::mutex m;
void hit_m() { m.lock(); ++m_hits; m.unlock(); }
```

## Many threads call one of these counters. What does `hit_m` pay on every call that `hit_a` does not?

---

**A `lock()` and an `unlock()`, and a wait whenever another thread holds `m`.**

The atomic `++` is a single indivisible instruction on mainstream
hardware, so no thread ever blocks on it. The mutex earns its cost once
an update must change more than one value together.
