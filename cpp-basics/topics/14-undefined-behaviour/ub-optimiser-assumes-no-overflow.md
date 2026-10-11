---
id: ub-optimiser-assumes-no-overflow
kind: basic
version: 1
level: 2
tags: [undefined-behaviour, optimisation, integers]
requires:
  - ub-signed-overflow-no-wrap
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://eel.is/c++draft/intro.abstract
---

## GCC at `-O2` compiles this function to `return false;`. Why is it allowed to?

```cpp
bool next_would_overflow(int x) { return x + 1 < x; }
```

---

**Signed overflow is undefined, so the compiler assumes `x + 1` never
overflows, and then `x + 1 < x` is always false.** Undefined behaviour is
not an event it must handle but a premise it optimises from. Test before
the operation instead: `x == INT_MAX`.
