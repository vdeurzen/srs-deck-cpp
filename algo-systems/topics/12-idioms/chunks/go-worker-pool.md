---
id: chunks-go-worker-pool
kind: chunk
version: 2
level: 3
tags: [idioms, concurrency, queues]
expose_ms: 11000
compile: null
requires:
  - ll-go-close-by-sender
  - ll-go-waitgroup-add
  - cpp-essentials/vocab-optional-maybe-value
elaborate: Say what decides `n` for a CPU-bound pool and for one that mostly waits on I/O.
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://en.cppreference.com/w/cpp/utility/optional
---

`jobs.pop()` blocks, then returns a `std::optional<Job>` that is empty
once the queue is closed and drained; `while (auto job = …)` loops while
it holds a value.

```cpp
std::vector<std::jthread> pool;
for (int i = 0; i < n; ++i)
    pool.push_back(std::jthread([&] {
        while (auto job = jobs.pop())
            run(*job);
    }));
```

---

**The worker pool**: a fixed number of threads draining one queue.
*Start* `n` threads; each *drains* the queue until `pop` reports it
closed, then returns. The pool vector owns the threads, so destroying it
joins them. Not a whole program, so graded by text.
