---
id: coroutines-await-suspend-return-types
kind: basic
version: 1
level: 4
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

## `await_suspend` may return `void`, `bool`, or a `std::coroutine_handle<>`. What does each one mean?

---

- **`void`** — the coroutine stays suspended and control returns to
  whoever resumed it. The plain case: hand the handle to a scheduler, a
  callback, or a completion queue, and return.
- **`bool`** — `true` behaves exactly like `void`; `false` means
  "never mind, resume me immediately". The escape hatch for an awaiter
  that only discovers the value is already available *after* it has
  started registering, and it must be used carefully: returning `false`
  resumes on the same stack, so the coroutine continues inside the
  `co_await`.
- **`std::coroutine_handle<>`** — that coroutine is resumed instead, by
  a tail call, and the current one stays suspended. This is symmetric
  transfer: it is how a finished task resumes its awaiting continuation
  without growing the stack. Return `std::noop_coroutine()` to mean
  "nobody to transfer to — just return to the resumer".

One rule spans all three: once `await_suspend` has published the handle,
another thread may resume (and finish, and destroy) the coroutine before
`await_suspend` returns. After publishing, the awaiter must touch
nothing that lives in the frame, including its own members.

An exception thrown out of `await_suspend` is delivered by resuming the
coroutine and rethrowing in its body, so `co_await` can fail without a
separate error channel.
