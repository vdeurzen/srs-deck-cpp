---
id: threads-owner-destroys-waiting-worker
kind: basic
version: 1
level: 3
tags: [concurrency, threads, condition-variable]
requires:
  - parsons-jthread-stop-token
  - cpp-essentials/threads-chunk-cv-wait
elaborate: Where else in your code does a thread block in a call that a stop request cannot interrupt, such as a blocking socket read?
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread/~jthread
  - https://en.cppreference.com/w/cpp/thread/condition_variable_any/wait
  - https://eel.is/c++draft/thread.condvarany.intwait
---

`worker` is a `std::jthread` running this loop, with `token` its
`std::stop_token`; `cv` is a `std::condition_variable`. The
`std::vector<int>` queue `q` is empty, and no producer will push again, when `worker`'s owner destroys it.

```cpp
while (!token.stop_requested()) {
    std::unique_lock<std::mutex> lk(m);
    cv.wait(lk, [&q] { return q.size() > 0; });
    int job = q.back();
    q.pop_back();
}
```

## What happens when the owner destroys `worker`?

---

**The owner hangs: the destructor requests stop, then joins a thread
that never wakes.**

`request_stop()` does not notify `cv`, and the predicate stays false.
`std::condition_variable_any::wait(lk, token, pred)` also returns once
stop is requested, so the loop can exit.
