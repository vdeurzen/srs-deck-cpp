---
id: class-mixed-ratio-int
kind: basic
version: 1
level: 3
tags: [classes, functions, recognition]
requires:
  - class-default-delete-where
  - class-explicit-blocks-conversion
  - fn-overload-ranking
elaborate: Which function in your code silently accepts an argument type it should refuse?
refs:
  - https://en.cppreference.com/w/cpp/language/function#Deleted_functions
---

## `void set_ratio(double r);` silently accepts `set_ratio(3)`. Callers must pass a `double`, so `set_ratio(3)` must fail to compile. What do you add?

---

**A deleted overload: `void set_ratio(int) = delete;`.**

`set_ratio(3)` now picks the exact match, `set_ratio(int)`, and a call to
a deleted function is a compile error. `explicit` cannot help: it applies
to constructors, and `set_ratio` is an ordinary function.
