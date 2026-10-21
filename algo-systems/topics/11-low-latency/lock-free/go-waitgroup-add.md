---
id: ll-go-waitgroup-add
kind: basic
version: 2
level: 2
tags: [concurrency, threads]
requires:
  - ll-go-blocking-basics
  - cpp-essentials/conc-atomic-int-intro
  - cpp-essentials/conc-jthread-joins-itself
elaborate: Say where else a counter must be raised before the work it counts is handed to another thread.
refs:
  - https://en.cppreference.com/w/cpp/thread/latch
  - https://en.cppreference.com/w/cpp/atomic/atomic
---

```cpp
std::atomic<int> pending = 0;
void work() { ++pending; run_one_job(); --pending; }

void run_batch(std::vector<std::jthread>& pool) {
    for (int i = 0; i < 4; ++i) pool.push_back(std::jthread(work));
    while (pending.load() != 0) {}   // wait for the batch
}
```

## Why can the wait loop finish before any job has run?

---

**Nothing orders any worker's `++pending` before the loop's first load, so it may read 0.**

Raise the count in the spawning thread before starting each worker, or
construct a `std::latch` with the job count up front and have each
worker `count_down()`.
