---
id: conc-waiting-destructor
kind: cloze
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-jthread-joins-itself
elaborate: Say where else in C++ a destructor does cleanup you might otherwise forget, and what it would cost to forget it there.
refs:
  - https://en.cppreference.com/w/cpp/thread/jthread
  - https://en.cppreference.com/w/cpp/thread/jthread/~jthread
---

In C++20, which standard type in the blank makes `refresh` wait for
`poll_once` to finish as it returns, with no `join()` call?

```cpp
void poll_once() { /* check the queue */ }

void refresh() {
    std::{{c1::jthread}} poller(poll_once);
}
```

---

**`std::jthread` joins in its destructor**, after asking the thread to
stop. A `std::thread` here would still be joinable when destroyed, and
call `std::terminate`.
