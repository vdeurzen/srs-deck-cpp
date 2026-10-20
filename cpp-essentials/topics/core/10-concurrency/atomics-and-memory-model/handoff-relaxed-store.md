---
id: atomics-handoff-relaxed-store
kind: basic
version: 1
level: 3
tags: [concurrency, atomics, memory-model, misconception]
requires:
  - atomics-handoff-worked
elaborate: Find a flag in your own code that one thread sets and another polls; say which order its store uses and what data the flag is meant to publish.
refs:
  - https://en.cppreference.com/w/cpp/atomic/memory_order#Relaxed_ordering
  - https://eel.is/c++draft/intro.races#21
---

Many expect the consumer's acquire load alone to make the hand-off safe,
since `data = 42` comes first in `producer`.

```cpp
int data = 0;
std::atomic<bool> ready{false};
void producer() { data = 42; ready.store(true, std::memory_order_relaxed); }
void consumer() {
    while (!ready.load(std::memory_order_acquire)) {}
    int x = data;
}
```

## B's loop has exited. What does the standard say about `int x = data;`?

---

**It is a data race, so undefined behaviour: a relaxed store synchronizes with nothing.**

Acquire pairs only with a release store. Here nothing makes
`data = 42` happen before the read, so `x` is not guaranteed to be 42,
or anything at all. Tempting, because on x86 `x` is usually 42 anyway.
