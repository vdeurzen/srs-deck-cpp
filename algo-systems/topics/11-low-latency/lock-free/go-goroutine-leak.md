---
id: ll-go-goroutine-leak
kind: code
version: 2
level: 3
tags: [concurrency, threads, shutdown]
requires:
  - ll-go-gc-roots
input: chips
choices:
  c1: ["std::condition_variable_any", "std::condition_variable", "std::atomic<bool>"]
compile:
  harness: |
    static_assert(std::is_same_v<decltype(pop), bool(std::stop_token, int&)>);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable_any/wait
  - https://en.cppreference.com/w/cpp/thread/jthread
---

`pop` runs on a `std::jthread` worker and receives its stop token.
Complete `cv`'s type so destroying the `jthread` wakes a worker blocked
on an empty queue, and `pop` returns `false`.

```cpp
#include <condition_variable>
#include <deque>
#include <mutex>
std::mutex m; std::deque<int> q;
{{c1::std\::condition_variable_any}} cv;
bool pop(std::stop_token st, int& out) {
  std::unique_lock lk(m);
  if (!cv.wait(lk, st, [] { return !q.empty(); })) return false;
  out = q.front(); q.pop_front(); return true;
}
```

---

**Only `condition_variable_any` has a `wait` that takes a `std::stop_token`.**
That overload registers a callback, so `request_stop()` wakes the
waiter, and it returns `false` when woken by the stop with the queue
still empty. `std::condition_variable` has no such overload and does not
compile here; `std::atomic<bool>::wait` takes a value, not a lock.
