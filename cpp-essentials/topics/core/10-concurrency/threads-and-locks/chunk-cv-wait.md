---
id: threads-chunk-cv-wait
kind: chunk
version: 3
level: 2
tags: [concurrency, threads, condition-variable, idioms]
expose_ms: 8000
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
std::unique_lock<std::mutex> lk(m);
cv.wait(lk, [&q] { return q.size() > 0; });
int job = q.back();
q.pop_back();
```

---

The **consumer side of a condition variable**, popping a job from a
shared `std::vector<int> q` guarded by `m` and `cv`: *lock* with a
`unique_lock` (never `lock_guard`, because `wait` must release it),
*wait* with the real condition as the predicate (so spurious wake-ups
and early notifies cannot break it), then *take* the job while the lock
is still held.
