---
id: execution-as-awaitable-channels
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
requires:
  - execution-three-channels
  - coroutines-await-transform-hook
refs:
  - https://eel.is/c++draft/exec.as.awaitable
  - https://eel.is/c++draft/exec.with.awaitable.senders
  - https://wg21.link/p2300
---

`as_awaitable(sndr, promise)` wraps a sender in an awaiter that
`connect`s it, in its constructor, to a receiver holding the coroutine
handle; `await_suspend` then only calls `start`. The sender must have
{{c1::at most one value completion signature::none → void, one value →
that type, several → a std\::tuple}}, so that the `co_await`
expression has a type. A `set_error` completion is stored as an
`exception_ptr` and {{c2::rethrown from await_resume::the coroutine
resumes at the co_await and the error unwinds like any exception}}.
A `set_stopped` completion never resumes this coroutine: the receiver
calls {{c3::promise.unhandled_stopped()::which returns the handle to
resume instead — the continuation's — and the coroutine's own body is
skipped}} and resumes the handle it returns, so cancellation goes
straight to the parent.

`with_awaitable_senders<Promise>` is the base that supplies the
`await_transform` applying `as_awaitable` to every operand, and the
promise hook the stopped path needs, delegating to the continuation's
promise — or terminating if that promise has none.
