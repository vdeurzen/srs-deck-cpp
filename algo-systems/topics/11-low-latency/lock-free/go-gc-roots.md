---
id: ll-go-gc-roots
kind: basic
version: 2
level: 2
tags: [concurrency, threads, shutdown]
requires:
  - ll-go-blocking-basics
  - cpp-essentials/conc-jthread-joins-itself
  - cpp-essentials/lambda-amp-capture-intro
elaborate: Which thread in code you know waits on something that a shutdown never signals, and what would its owner's destructor do?
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread/~jthread
  - https://en.cppreference.com/w/cpp/thread/condition_variable_any/wait
---

A `std::jthread` worker is blocked here, and nothing will ever push to
`q` again:

```cpp
std::unique_lock lk(m);
cv.wait(lk, [&] { return !q.empty(); });   // cv is a std::condition_variable
```

## The worker's owner now destroys the `jthread`. What happens?

---

**The destructor hangs: it joins, and this `wait` never sees the stop request.**

`request_stop()` only sets a flag; a plain `condition_variable::wait`
does not watch it, so the worker stays blocked and `join()` waits
forever. Blocked is not finished: shutdown must wake every waiter.
