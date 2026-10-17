---
id: atomics-compare-exchange-failure
kind: basic
version: 1
level: 2
tags: [concurrency, atomics, lock-free]
requires:
  - atomics-modification-order
  - conc-check-then-act
refs:
  - https://en.cppreference.com/w/cpp/atomic/atomic/compare_exchange
  - https://eel.is/c++draft/atomics.types.operations
---

## After these lines, what are `ok`, `expected` and `v`?

```cpp
std::atomic<int> v{7};
int expected = 5;
bool ok = v.compare_exchange_strong(expected, 9);
```

---

**`ok` is `false`, `expected` is 7, `v` is still 7.**
One indivisible step: if `v == expected`, store 9 and return `true`;
otherwise copy `v`'s current value into `expected` and return `false`.
The test and the change cannot be split, so no thread slips between
them, and a failed call hands you a fresh value to retry with.
