---
id: coroutines-what-makes-a-coroutine
kind: basic
version: 1
level: 3
tags: [coroutines]
requires:
  - raii-storage-durations
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## What makes a C++ function a coroutine, purely syntactically?

---

**At least one `co_await`, `co_yield` or `co_return` in its body.**
Nothing on the declaration says so: the compiler decides from the body
alone. That is why the return type must then satisfy the coroutine
protocol — a nested `promise_type`, directly or via
`std::coroutine_traits` — and why a plain `return` is suddenly
ill-formed.
