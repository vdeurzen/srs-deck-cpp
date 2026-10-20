---
id: conc-single-counter-fix
kind: code
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-atomic-int-intro
elaborate: Say why `volatile` is so often mistaken for a threading tool, and what it is really for.
input: chips
choices:
  c1: ["std::atomic<int>", "int", "volatile int", "std::atomic<bool>"]
compile:
  harness: |
    // The type must offer a single-step read-modify-write.
    static_assert(requires { hits.fetch_add(1); });
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/atomic/atomic/operator_arith
---

Several threads call `count_hit` at the same time, with no mutex
(`volatile` tells the compiler every read and write of the variable must
really happen). Complete the declaration so no increment is lost and
there is no data race.

```cpp
#include <atomic>
{{c1::std\::atomic<int>}} hits{0};

void count_hit() { ++hits; }
```

---

**On `std::atomic<int>`, `++hits` is one indivisible step**, so no other
thread can load between its load and its store: N calls add exactly N.
A plain `int` loses updates and races. `volatile` keeps every load and
store but still does them as separate steps, so it races too.
`std::atomic<bool>` has no `++`.
