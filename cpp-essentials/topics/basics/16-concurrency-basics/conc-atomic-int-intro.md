---
id: conc-atomic-int-intro
kind: basic
version: 1
level: 1
tags: [concurrency, atomics, threads, foundations]
requires:
  - conc-thread-shares-memory
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
int main() {
    std::thread a(work);
    std::thread b(work);
    a.join();
    b.join();
}
```

## After both joins, what is `hits`?

---

**Exactly 2000: each `++hits` on an atomic is one indivisible step.**

`std::atomic<int>` makes load, add and store a single read-modify-write,
so no other thread can slip in between and no update is lost. With a
plain `int` the same program loses updates and its total varies.
