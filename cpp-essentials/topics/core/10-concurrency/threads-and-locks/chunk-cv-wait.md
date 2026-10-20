---
id: threads-chunk-cv-wait
kind: chunk
version: 2
level: 2
tags: [concurrency, threads, condition-variable, idioms]
expose_ms: 12000
compile: null
requires:
  - threads-cv-wait-lock-type
  - vector-back-pop-back
  - lambda-amp-capture-intro
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/unique_lock
elaborate: Say what could go wrong if `pop` released the lock between the `wait` and reading `q.back()`.
---

```cpp
int pop(std::mutex& m, std::condition_variable& cv, std::vector<int>& q) {
  std::unique_lock<std::mutex> lk(m);
  cv.wait(lk, [&q] { return q.size() > 0; });
  int job = q.back();
  q.pop_back();
  return job;
}
```

---

The **consumer side of a condition variable**: a `unique_lock` (never
`lock_guard`, because `wait` must release it), a `wait` whose predicate
is the real condition (so spurious wake-ups and early notifies cannot
break it), and the shared state read and modified while the lock is
still held: the pop happens before `lk` goes out of scope.
