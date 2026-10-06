---
id: coroutines-plain-return-forbidden
kind: basic
version: 1
level: 3
tags: [coroutines]
requires:
  - coroutines-what-makes-a-coroutine
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
---

## Why can a coroutine never contain a plain `return` statement?

---

**Because every way out must go through the promise.** The compiler
rewrites `co_return;` into `promise.return_void()`, `co_return expr;`
into `promise.return_value(expr)`, and then awaits
`promise.final_suspend()`. A plain `return` would leave the frame
without running that protocol, so the grammar forbids mixing them: a
body holding both `return` and `co_await` is ill-formed, not a
coroutine with a shortcut.
