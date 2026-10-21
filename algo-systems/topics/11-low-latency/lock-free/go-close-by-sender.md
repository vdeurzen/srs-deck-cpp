---
id: ll-go-close-by-sender
kind: basic
version: 2
level: 2
tags: [concurrency, queues, shutdown]
requires:
  - ll-go-blocking-basics
  - cpp-essentials/threads-cv-wait-needs-predicate
  - cpp-essentials/lambda-amp-capture-intro
elaborate: With three producer threads, who should set `done`, and what goes wrong if the first producer to finish sets it?
refs:
  - https://en.cppreference.com/w/cpp/thread/condition_variable/wait
  - https://en.cppreference.com/w/cpp/thread/condition_variable/notify_all
---

The consumer pops jobs like this:

```cpp
std::unique_lock lk(m);
cv.wait(lk, [&] { return !q.empty(); });
Job j = q.front();
q.pop_front();
```

## The producer has pushed its last job and is about to exit. What must it do so the consumer does not sleep forever on an empty queue?

---

**Set `done = true` under the lock, `notify_all`, and make the predicate `!q.empty() || done`.**

A notify that changes no state is lost or rejected by the predicate;
"closed" must be state the waiter can test. The consumer then drains
what is left and returns when the queue is empty and `done` is set.
