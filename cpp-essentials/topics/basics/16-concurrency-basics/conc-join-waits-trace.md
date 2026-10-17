---
id: conc-join-waits-trace
kind: trace
version: 1
level: 1
tags: [concurrency, threads, tracing]
requires:
  - conc-thread-shares-memory
  - stdalgo-capture-ref-vs-copy
probes:
  1: { seen: "10" }
  2: { later: "21" }
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/join
  - https://eel.is/c++draft/thread.thread.member
---

```cpp
int total = 0;
std::thread t([&total] {
    for (int i = 1; i <= 4; ++i) total += i;
});
t.join();
int seen = total;                 // @1
total *= 2;
std::thread u([&total] { total += 1; });
u.join();
int later = total;                // @2
```

---

`join()` blocks the calling thread until the other thread's function has
returned, and makes everything that thread wrote visible to the caller.
So @1 sees the finished sum 1 + 2 + 3 + 4 = 10, then `main` doubles it to
20 and `u` adds 1. Each read here comes after a `join`, so only one
thread touches `total` at a time: the result is the same on every run.
Verified by running an instrumented copy (`g++ -std=c++23 -pthread`),
also clean under ThreadSanitizer.
