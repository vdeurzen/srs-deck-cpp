---
id: types-uninit-local-read
kind: basic
version: 1
level: 1
tags: [types, initialization, undefined-behaviour]
requires:
  - ub-definition
refs:
  - https://en.cppreference.com/w/cpp/language/default_initialization
  - https://eel.is/c++draft/basic.indet
elaborate: Which compiler flags would you turn on in your own builds to catch this before it ships?
---

## In C++23, what does `count_evens(4)` return?

```cpp
int count_evens(int n) {
    int evens;
    for (int i = 1; i <= n; ++i)
        if (i % 2 == 0) ++evens;
    return evens;
}
```

---

**Nothing you can rely on: reading `evens` is undefined behaviour.** A
local `int` with no initializer holds an *indeterminate* value, whatever
that memory held before, so tests may pass by luck. Unlike Go, C++ does
not zero it: write `int evens = 0;`.
