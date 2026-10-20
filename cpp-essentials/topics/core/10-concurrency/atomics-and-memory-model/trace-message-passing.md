---
id: atomics-trace-message-passing
kind: trace
version: 3
level: 2
tags: [concurrency, atomics, memory-model, tracing]
probes:
  1: { a: "5" }
  2: { b: "15" }
requires:
  - atomics-synchronizes-with
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://eel.is/c++draft/intro.races
elaborate: Say what would go wrong, and why, if `second` stored 2 with `std::memory_order_relaxed` instead.
---

`first` and `second` start at the same time, each on its own thread.

```cpp
int a = 0, b = 0;
std::atomic<int> turn{0};
void first() {
  a = 1;
  turn.store(1, std::memory_order_release);
  while (turn.load(std::memory_order_acquire) != 2) {}
  b = a + 10;               // @2
}
void second() {
  while (turn.load(std::memory_order_acquire) != 1) {}
  a = a * 5;                // @1
  turn.store(2, std::memory_order_release);
}
```

---

The handoff runs both ways. `second` leaves its loop only on reading the
1 that `first` stored with release, so `a = 1` happens before `a * 5`:
`a` is 5. Then `first` leaves its loop only on reading the 2 that
`second` stored with release, so `a = a * 5` happens before `a + 10`:
`b` is 15, never 11. Each acquire load synchronizes with the release
store whose value it read. Verified with GCC 16.2 under ThreadSanitizer.
