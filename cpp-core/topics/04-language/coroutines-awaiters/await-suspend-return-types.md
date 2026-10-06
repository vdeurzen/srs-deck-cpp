---
id: coroutines-await-suspend-return-types
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-suspension-points-cloze
  - coroutines-handle-operations
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

## `await_suspend` may return `void`, `bool`, or a `std::coroutine_handle<>`. What does each one mean?

---

- **`void`**: stay suspended; control returns to the resumer. Hand the handle to a scheduler or completion queue.
- **`bool`**: `true` is `void`; `false` means "resume me now, on this stack", for an awaiter that finds the value ready only after it started registering.
- **`std::coroutine_handle<>`**: resume *that* coroutine instead, as a tail call (symmetric transfer); `std::noop_coroutine()` means "nobody".
