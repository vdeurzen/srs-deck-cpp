---
id: conc-mutex-takes-turns
kind: basic
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-lost-update-trace
refs:
  - https://en.cppreference.com/w/cpp/thread/mutex
  - https://en.cppreference.com/w/cpp/thread/lock_guard
---

```cpp
int count = 0;
std::mutex m;

void record() {
    m.lock();
    ++count;
    m.unlock();
}
```

## Thread A is between `lock()` and `unlock()` when thread B calls `record()`. What does B's `m.lock()` do?

---

**B blocks until A unlocks `m`; only then does B continue.**

A `std::mutex` lets one thread at a time past `lock()`, so the two
`++count` cannot interleave. Real code writes the pair as
`std::lock_guard<std::mutex> g(m);`: its constructor locks and its
destructor unlocks, so an exception cannot leave `m` locked forever.
