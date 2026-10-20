---
id: ub-optimiser-assumes-no-overflow
kind: basic
version: 1
level: 2
tags: [undefined-behaviour, optimisation, integers]
requires:
  - types-overflow-rules
elaborate: Where in your own code does a check run after the arithmetic it guards, and how would you move it before?
refs:
  - https://en.cppreference.com/w/cpp/language/ub
  - https://eel.is/c++draft/intro.abstract
---

## GCC with optimisation on (`-O2`) compiles this function to `return false;`. Why is it allowed to?

```cpp
bool next_would_overflow(int x) { return x + 1 < x; }
```

---

**Signed overflow is undefined, so the compiler assumes it never happens.**
Without overflow, `x + 1 < x` is always false. Undefined behaviour is
not an event it must handle but a premise it optimises from. Test before
the operation instead: is `x` already the largest `int`?
