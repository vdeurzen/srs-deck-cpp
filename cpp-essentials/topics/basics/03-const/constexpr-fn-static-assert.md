---
id: constexpr-fn-static-assert
kind: basic
version: 1
level: 1
tags: [constexpr, static-assert, compile-time]
requires:
  - const-vs-constexpr-initializer
elaborate: Say in one sentence what a test written as a `static_assert` can catch that a test run after the build cannot.
refs:
  - https://en.cppreference.com/w/cpp/language/static_assert
  - https://en.cppreference.com/w/cpp/language/constexpr
  - https://eel.is/c++draft/dcl.pre
---

## `constexpr` on a function lets its calls appear where a constant is needed, and it still runs normally at run time. What happens when you build and run this program?

```cpp
constexpr int sq(int x) { return x * x; }
static_assert(sq(3) == 10);
```

---

**It never runs: the build stops with an error, because `sq(3)` is 9.**

`static_assert(cond)` makes the compiler compute `cond` during compilation
and reject the program if it is false; nothing ever runs. A test written
this way fails the build itself, before any binary exists.
