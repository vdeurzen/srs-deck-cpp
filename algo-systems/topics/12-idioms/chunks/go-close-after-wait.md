---
id: chunks-go-close-after-wait
kind: chunk
version: 2
level: 3
tags: [idioms, concurrency, shutdown]
expose_ms: 6500
compile: null
requires:
  - chunks-go-worker-pool
  - ll-go-close-by-sender
elaborate: Say what happens to jobs still queued at the close, and how you would make the shutdown drop them instead.
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread/join
  - https://en.cppreference.com/w/cpp/thread/condition_variable/notify_all
---

The producer has pushed its last job; `pool` holds the worker threads
draining `jobs`.

```cpp
jobs.close();
for (auto& t : pool)
    t.join();
```

---

**Pool shutdown: close, then join.** `close()` sets the queue's done
flag and wakes every waiter, so each worker's `pop` returns empty once
the queue is drained and the thread ends. Joining first would deadlock:
the workers stay blocked in `pop` on a queue nobody will close. Not a
whole program, so graded by text.
