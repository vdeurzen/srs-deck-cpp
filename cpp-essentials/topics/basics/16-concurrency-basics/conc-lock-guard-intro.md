---
id: conc-lock-guard-intro
kind: basic
version: 1
level: 1
tags: [concurrency, threads, foundations]
requires:
  - conc-mutex-takes-turns
  - life-destructor-intro
elaborate: Say what Go's `mu.Lock(); defer mu.Unlock()` shares with this, and which way out of a function `defer` and a destructor both cover.
refs:
  - https://en.cppreference.com/w/cpp/thread/lock_guard
  - https://eel.is/c++draft/thread.lock.guard
---

```cpp
#include <mutex>
int count = 0;
std::mutex m;

void record() {
    std::lock_guard<std::mutex> g(m);
    ++count;
}
```

## Nothing in `record` calls `m.unlock()`. When is `m` unlocked?

---

**When `g` is destroyed at `record`'s closing brace: its destructor unlocks `m`.**

A `std::lock_guard` locks the mutex it is given in its constructor and
unlocks it in its destructor. Destructors run on every way out of the
scope, an early `return` or an exception included, so no path can leave
`m` locked.
