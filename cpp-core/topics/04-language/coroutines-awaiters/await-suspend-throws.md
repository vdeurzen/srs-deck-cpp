---
id: coroutines-await-suspend-throws
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-await-suspend-return-types
refs:
  - https://eel.is/c++draft/expr.await
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

## `await_suspend` throws after the coroutine has already suspended. Where does the exception come out?

---

**Inside the awaiting coroutine, at the `co_await`.** The exception is
caught, the coroutine is resumed, and it is rethrown there without
calling `await_resume` ([expr.await]/5.1). A failed registration thus
surfaces as an ordinary exception in the body — the awaiter needs no
separate error channel — and the coroutine is never left suspended
with nobody to resume it.
