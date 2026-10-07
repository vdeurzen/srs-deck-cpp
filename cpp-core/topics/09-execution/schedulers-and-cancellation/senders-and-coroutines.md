---
id: execution-senders-and-coroutines
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
refs:
  - https://eel.is/c++draft/exec.as.awaitable
  - https://eel.is/c++draft/exec.task
  - https://wg21.link/p3552
requires:
  - execution-as-awaitable-channels
  - execution-connect-and-start
---

## In C++26, how do senders and coroutines plug into each other?

---

**Both ways: a coroutine can `co_await` a sender, and a
`std::execution::task` coroutine *is* a sender.**

`as_awaitable` (via `with_awaitable_senders` or `task`'s promise) turns
`co_await when_all(a, b)` into connect-and-start. `task<T>` (P3552)
models `sender`, so a coroutine composes with `then`, `when_all` and
`sync_wait` like any other work.
