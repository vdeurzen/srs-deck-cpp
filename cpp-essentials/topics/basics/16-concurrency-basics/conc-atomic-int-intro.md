---
id: conc-atomic-int-intro
kind: basic
version: 2
level: 1
tags: [concurrency, atomics, threads, foundations]
requires:
  - conc-lost-update-worked
  - std-names-and-headers
elaborate: Say when one atomic counter is enough and when you would need a mutex instead.
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/atomic/atomic/operator_arith
---

```cpp
std::atomic<int> hits{0};
void work() {
    for (int i = 0; i < 1000; ++i) ++hits;
}
// two threads run work(); main joins both
```

## With a plain `int hits`, the total can end below 2000. What does `std::atomic<int>` change about `++hits`?

---

**`++hits` becomes one indivisible read-modify-write: no thread can load in the middle.**

A plain `int`'s `++` is a separate load, add and store, and a second
thread can load between them and lose an update. `std::atomic<int>`
(from `<atomic>`) does all three as one step, so the total is exactly
2000 on every run.
