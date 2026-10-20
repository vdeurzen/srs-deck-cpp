---
id: class-default-delete-where
kind: basic
version: 1
level: 1
tags: [classes, special-members, functions]
requires:
  - class-constructor-intro
elaborate: Which function in your code would you `= delete` to turn a misuse into a compile error?
refs:
  - https://eel.is/c++draft/dcl.fct.def.default#1
  - https://en.cppreference.com/w/cpp/language/function#Deleted_functions
---

Writing `= default` instead of a function body asks the compiler to write
that function itself; writing `= delete` makes every call to it a compile
error.

## In C++23, one declaration in `Gauge` fails to compile. Which one?

```cpp
struct Gauge {
    Gauge() = default;
    int read() = default;
    Gauge(int) = delete;
    void calibrate(double) = delete;
};
```

---

**`int read() = default;`: only special members (and comparison
operators) can be defaulted.** Special members are the few functions the
compiler knows how to write, such as the no-argument constructor; it
cannot guess what `read` should return. `= delete` fits any function, ordinary ones
included.
