---
id: threads-cv-wait-lock-type
kind: code
version: 1
level: 2
tags: [concurrency, threads, condition-variable, mutex]
input: chips
choices:
  c1: ["std::unique_lock<std::mutex>", "std::lock_guard<std::mutex>", "std::scoped_lock<std::mutex>"]
compile:
  harness: |
    int main() {}
requires:
  - threads-cv-wait-needs-predicate
refs:
  - https://en.cppreference.com/w/cpp/thread/unique_lock
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
---

Complete the lock type so this consumer compiles. Be ready to say
what `wait` needs from the lock that the other two cannot give.

```cpp
#include <condition_variable>
#include <mutex>
std::mutex m;
std::condition_variable cv;
bool ready = false;
void wait_ready() {
  {{c1::std\::unique_lock<std\::mutex>}} lk(m);
  cv.wait(lk, [] { return ready; });
}
```

---

**`std::unique_lock` is the lock that can `unlock()` and `lock()`
again mid-scope**, which is exactly what `wait` does on the caller's
behalf; `condition_variable::wait` therefore takes a
`unique_lock<mutex>&` and nothing else. `lock_guard` and `scoped_lock`
are lock-on-construct, unlock-on-destroy only — the right default
everywhere a lock is not handed to something that must release it.
(`condition_variable_any` accepts any lockable, at some cost.)
