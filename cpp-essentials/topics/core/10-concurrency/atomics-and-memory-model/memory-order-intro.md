---
id: atomics-memory-order-intro
kind: basic
version: 1
level: 1
tags: [concurrency, atomics, memory-model]
requires:
  - conc-atomic-int-intro
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/atomics.order
elaborate: Say in one sentence, as to an interviewer, why `data` itself does not need to be atomic here.
---

`store` and `load` write and read an atomic; the second argument says
how it orders the thread's other memory accesses. Thread A runs
`producer`, B `consumer`.

```cpp
int data = 0;
std::atomic<bool> ready{false};
void producer() { data = 42; ready.store(true, std::memory_order_release); }
void consumer() {
    while (!ready.load(std::memory_order_acquire)) {}
    int x = data;
}
```

## B's loop has just exited. Why must `x` be 42, never 0?

---

**B's acquire load read what A's release store wrote, so A's earlier writes are visible.**

A release store publishes A's earlier writes to any acquire load that
reads its value. With `std::memory_order_relaxed` on both, `ready`
carries nothing else: `data = 42` might not be visible yet.
