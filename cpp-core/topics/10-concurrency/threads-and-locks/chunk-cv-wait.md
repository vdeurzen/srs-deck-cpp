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
std::unique_lock lk(m);
cv.wait(lk, [] { return !items.empty(); });
int job = items.front();
items.pop_front();
```

---

The **consumer side of a condition variable**: a `unique_lock` (never
`lock_guard`, because `wait` must release it), a `wait` whose predicate
is the real condition (so spurious wake-ups and early notifies cannot
break it), and the shared state read and modified while the lock is
still held — the pop must happen before `lk` goes out of scope. Graded
by text (`compile: null`): the snippet is a fragment of a larger
consumer, so `m`, `cv` and `items` are deliberately not declared here.
