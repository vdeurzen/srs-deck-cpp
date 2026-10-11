---
id: types-uninit-local-read
kind: basic
version: 1
level: 1
tags: [types, initialization, undefined-behaviour]
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
local `int` with no initializer holds an *indeterminate* value, often
whatever the stack held before, so tests may pass by luck. Write
`int evens = 0;` (or `int evens{};`). Only variables with static storage
duration start at zero automatically.
