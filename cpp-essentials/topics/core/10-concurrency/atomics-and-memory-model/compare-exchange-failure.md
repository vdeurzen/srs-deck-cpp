---
id: atomics-compare-exchange-failure
kind: basic
version: 2
level: 2
tags: [concurrency, atomics, lock-free]
requires:
  - conc-check-then-act
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
  - https://eel.is/c++draft/atomics.types.operations
elaborate: Say in one sentence why a failed `compare_exchange` writing the current value into `expected` saves the caller a separate load.
---

`v.compare_exchange_strong(expected, desired)` stores `desired` into `v`
only if `v == expected`, in one indivisible step, and returns whether it
did.

```cpp
std::atomic<int> v{7};
int expected = 5;
bool ok = v.compare_exchange_strong(expected, 9);   // ok is false
```

## What is `expected` after this failed call?

---

**7: a failed call copies `v`'s current value into `expected`.**

`v` stays 7. The test and the change cannot be split, so no thread
slips between them, and the failure hands back a fresh value to retry
with, without a separate `load`.
