---
id: coroutines-what-makes-a-coroutine
kind: basic
version: 1
level: 3
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
---

## What makes a C++ function a coroutine, purely syntactically?

Using at least one of `co_await`, `co_yield`, or `co_return` anywhere in
its body. There is no keyword on the function's declaration itself — the
compiler decides a function is a coroutine entirely from what appears
inside it, which is why a coroutine cannot use plain `return` (even with
no value) or ordinary varargs, and why its return type must satisfy the
coroutine protocol (have a nested `promise_type`, directly or via
`std::coroutine_traits`).

`co_await` suspends until an awaited value is ready, `co_yield` suspends
and produces a value to the caller (used for generators), and `co_return`
completes the coroutine, optionally with a value.
