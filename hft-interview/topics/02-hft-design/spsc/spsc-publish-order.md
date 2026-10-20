---
id: spsc-publish-order
kind: basic
version: 1
level: 4
tags: [spsc, lock-free, memory-model, misconception]
requires:
  - algo-systems/ll-spsc-orders
refs:
  - https://eel.is/c++draft/intro.races
  - https://en.cppreference.com/w/cpp/atomic/memory_order
  - https://clang.llvm.org/docs/ThreadSanitizer.html
elaborate: Which test would have caught it — a run on AArch64, a ThreadSanitizer build, or neither, and why?
---

## Your SPSC producer publishes with `tail_.store(t + 1, std::memory_order_relaxed)`. A billion-item stress test on x86-64 passes. Why is it still wrong?

```cpp
buf_[t & (N - 1)] = x;                              // plain write
tail_.store(t + 1, std::memory_order_relaxed);
```

---

**Without `release`, the slot write races with the consumer's read: undefined behaviour.**
x86 happens to keep stores in order, so the test can't see it. The
compiler, though, may sink `buf_`'s write past a relaxed store, and an
AArch64 core can reorder the two stores itself. ThreadSanitizer reports
the race.
