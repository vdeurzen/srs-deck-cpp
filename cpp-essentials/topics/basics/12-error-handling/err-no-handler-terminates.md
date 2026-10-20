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
elaborate: Say where in `main` you would put a `catch` so that such a failure ends with a clear message instead of `std::terminate`.
---

## `main` calls `load()`, which throws a `std::runtime_error` (a standard exception type). No `catch` anywhere in the program matches it. What happens?

---

**`std::terminate` is called, and by default it aborts the program.**

The search for a handler walks outward through every caller. Once it has
passed `main` with no match, nothing is left to hand the exception to.
Whether destructors run on the way out is left to each compiler.
