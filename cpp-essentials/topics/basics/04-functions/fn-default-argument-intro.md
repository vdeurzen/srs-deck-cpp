---
id: fn-default-argument-intro
kind: basic
version: 1
level: 1
tags: [functions, foundations]
elaborate: Go has no default arguments; say what you would write in Go instead, and what the C++ version saves the caller.
refs:
  - https://en.cppreference.com/w/cpp/language/default_arguments
  - https://eel.is/c++draft/dcl.fct.default
---

```cpp
int scale(int x, int factor = 2) {
    return x * factor;
}

int a = scale(7);
```

## `scale` takes two parameters, yet the call passes one. What is `a`?

---

**14: the missing `factor` takes its default argument, `2`.**

A default argument fills a trailing parameter that the call leaves out,
so `scale(7)` means `scale(7, 2)`; `scale(7, 3)` passes 3 instead. Only
the last parameters may have one, because arguments match parameters
left to right.
