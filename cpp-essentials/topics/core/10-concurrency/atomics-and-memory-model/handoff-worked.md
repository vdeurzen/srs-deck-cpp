---
id: atomics-handoff-worked
kind: basic
version: 1
level: 2
tags: [concurrency, atomics, memory-model, worked-example]
requires:
  - atomics-synchronizes-with
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order#Release-Acquire_ordering
  - https://eel.is/c++draft/atomics.order#2
---

Thread A runs `producer`, thread B `consumer`, at the same time.

```cpp
int data = 0;
std::atomic<bool> ready{false};
void producer() { data = 42; ready.store(true, std::memory_order_release); }
void consumer() {
    while (!ready.load(std::memory_order_acquire)) {}
    int x = data;
}
```

| step | thread: action | effect |
| --- | --- | --- |
| 1 | A: `data = 42;` | plain write |
| 2 | B: acquire load reads `false` | loop again |
| 3 | A: release store of `true` | publishes step 1 |
| 4 | B: acquire load reads `true` | loop exits |
| 5 | B: `int x = data;` | reads 42 |

## Both loads in steps 2 and 4 are acquire loads. Why is it step 4, not step 2, that makes step 5 safe?

---

**Only a load that reads the release store's value synchronizes with it.**

Step 2 read the initial `false`, which no release store wrote, so it
pairs with nothing. Step 4 read step 3's `true`, so step 1 happens
before step 5 and the read of `data` is not a data race.
