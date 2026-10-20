---
id: conc-check-then-act
kind: basic
version: 1
level: 2
tags: [concurrency, threads, misconception]
requires:
  - conc-atomic-int-intro
  - conc-mutex-takes-turns
elaborate: Find an `if` in your own code that tests shared state and then changes it. What stops another thread from changing that state between the test and the change?
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
---

```cpp
std::atomic<int> seats{1};

void book() {
    if (seats > 0)
        --seats;
}
```

Many expect `std::atomic` to make `book()` safe to call from several threads.

## Two threads call `book()` at the same time. What values can `seats` end at?

---

**0 or -1.**

0 if one thread decrements before the other tests. -1 if both read 1
and pass the `if` before either decrements. Each load and `--` is
indivisible, but the test and the decrement are two operations. Hold a
mutex around both, or use one atomic operation that tests and changes
together.
