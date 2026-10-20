---
id: conc-lock-the-counter
kind: code
version: 1
level: 1
tags: [concurrency, threads]
elaborate: Say what would go wrong if `bump` called `m.lock()` and `m.unlock()` by hand and a line between them returned early.
input: chips
choices:
  c1:
    - "std::lock_guard<std::mutex> hold(m);"
    - "std::lock_guard<std::mutex> hold(&m);"
    - "std::lock_guard<std::mutex>(m);"
    - "std::lock_guard<std::mutex> hold(std::mutex{});"
compile:
  harness: |
    int main() {}
requires:
  - conc-lock-guard-intro
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
`std::lock_guard<std::mutex>(m);` declares a new guard *named* `m`
with no mutex, which does not compile. `&m` is a pointer, not a mutex.
A fresh `std::mutex{}` per call would be shared by no one, and does not
compile.
