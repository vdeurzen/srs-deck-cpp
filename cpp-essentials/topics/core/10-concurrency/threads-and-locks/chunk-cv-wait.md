---
id: threads-chunk-cv-wait
kind: chunk
version: 1
level: 2
tags: [concurrency, threads, condition-variable, idioms]
expose_ms: 6000
compile: null
requires:
  - threads-cv-wait-lock-type
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/unique_lock
---

```cpp
int pop(std::mutex& m, std::condition_variable& cv, std::deque<int>& items) {
  std::unique_lock lk(m);
  cv.wait(lk, [&] { return !items.empty(); });
  int job = items.front();
  items.pop_front();
  return job;
}
```

---

The **consumer side of a condition variable**: a `unique_lock` (never
`lock_guard`, because `wait` must release it), a `wait` whose predicate
is the real condition (so spurious wake-ups and early notifies cannot
break it), and the shared state read and modified while the lock is
still held — the pop must happen before `lk` goes out of scope. Graded
by text (`compile: null`): a compiled snippet would need three
`#include`s, more lines than the idiom itself.
