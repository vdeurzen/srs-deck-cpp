---
id: conc-single-counter-fix
kind: code
version: 1
level: 1
tags: [concurrency, threads]
requires:
  - conc-lost-update-trace
input: chips
choices:
  c1: ["std::atomic<int>", "std::atomic<bool>", "std::shared_ptr<int>", "volatile int", "thread_local int"]
compile:
  harness: |
    // The type must offer a single-step read-modify-write.
    static_assert(requires { hits.fetch_add(1); });
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/atomic/atomic/operator_arith
---

Several threads call `count_hit` at the same time, with no mutex.
Complete the declaration so no increment is lost and there is no data
race.

```cpp
#include <atomic>
#include <memory>
{{c1::std\::atomic<int>}} hits{0};

void count_hit() { ++hits; }
```

---

**On `std::atomic<int>`, `++hits` is one indivisible step**, so no other
thread can load between its load and its store: N calls add exactly N.
`std::atomic<bool>` has no `++`. `shared_ptr` makes only its reference
count thread-safe, not the `int`. `volatile` does not make `++` one step.
`thread_local` gives each thread its *own* `hits`.
