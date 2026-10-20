---
id: conc-join-waits-trace
kind: trace
version: 1
level: 1
tags: [concurrency, threads, tracing]
requires:
  - conc-thread-shares-memory
probes:
  1: { seen: "10" }
  2: { later: "21" }
elaborate: Say what Probe 1 could read, and what would happen when `t` is destroyed, if `t.join();` were missing.
refs:
  - https://en.cppreference.com/w/cpp/thread/thread/join
  - https://eel.is/c++draft/thread.thread.member
---

```cpp
int total = 0;                    // a global
void add_ten() { total += 4; total += 6; }
void add_one() { total += 1; }

int main() {
    std::thread t(add_ten);
    t.join();
    int seen = total;             // @1
    total *= 2;
    std::thread u(add_one);
    u.join();
    int later = total;            // @2
}
```

---

`join()` blocks the calling thread until the other thread's function has
returned, and makes everything that thread wrote visible to the caller.
So Probe 1 sees both of `t`'s writes, 4 + 6 = 10, never 0 or 4; then `main`
doubles it to 20 and `u` adds 1. Each read here comes after a `join`, so only one
thread touches `total` at a time: the result is the same on every run.
Verified by running an instrumented copy (`g++ -std=c++23 -pthread`).
