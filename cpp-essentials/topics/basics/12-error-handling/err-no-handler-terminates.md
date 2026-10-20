---
id: err-no-handler-terminates
kind: basic
version: 1
level: 1
tags: [exceptions]
requires:
  - err-throw-catch-intro
  - life-destructor-intro
refs:
  - https://eel.is/c++draft/except.handle
  - https://en.cppreference.com/w/cpp/error/terminate
elaborate: Go has an unrecovered `panic`; say how this outcome compares, and where your `main` would catch to avoid it.
---

## `main` calls `load()`, which throws a `std::runtime_error`. No `catch` anywhere in the program matches it. What happens?

---

**`std::terminate` is called, and by default it aborts the program.**

The search for a handler walks outward through every caller. Once it has
passed `main` with no match, nothing is left to hand the exception to.
Whether destructors run on the way out is left to each compiler.
