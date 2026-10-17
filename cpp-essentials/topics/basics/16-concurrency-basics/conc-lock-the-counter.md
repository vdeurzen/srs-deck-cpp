---
id: conc-lock-the-counter
kind: code
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-mutex-takes-turns
  - life-scope-automatic
input: chips
choices:
  c1:
    - "std::lock_guard<std::mutex> hold(m);"
    - "std::lock_guard<std::mutex>(m);"
    - "std::lock_guard<std::mutex> hold(count);"
    - "std::lock_guard<std::mutex> hold(std::mutex{});"
compile:
  harness: |
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/thread/mutex
  - https://en.cppreference.com/w/cpp/thread/lock_guard
---

Several threads call `bump` at the same time. Complete it so no two of
them touch `count` at once.

```cpp
#include <mutex>
int count = 0;
std::mutex m;

void bump() {
    {{c1::std\::lock_guard<std\::mutex> hold(m);}}
    ++count;
}
```

---

**A named guard on the shared `m` holds it until the end of the scope.**
Without a name, `(m)` declares a new guard *called* `m` that locks
nothing (here it fails to compile). The guard locks the mutex, not the
data, so `count` is the wrong argument. A fresh `std::mutex{}` per call
would be shared by no one; the guard refuses a temporary.
