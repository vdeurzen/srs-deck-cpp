---
id: execution-as-awaitable-channels
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
requires:
  - execution-three-channels
  - coroutines-await-transform-hook
elaborate: Say in one sentence, as to an interviewer, why cancellation of an awaited sender skips straight to the parent coroutine instead of resuming the child.
refs:
  - https://eel.is/c++draft/exec.as.awaitable
  - https://eel.is/c++draft/exec.with.awaitable.senders
  - https://wg21.link/p2300
---

`as_awaitable(sndr, promise)` wraps a sender in an awaiter. The sender
must have {{c1::at most one value completion signature::a count}}, so
the `co_await` expression has a type. A `set_error` completion is stored
as an `exception_ptr` and {{c2::rethrown from await_resume::where, in
the awaiter?}}. A `set_stopped` completion never resumes this
coroutine: the receiver calls {{c3::promise.unhandled_stopped()::a
promise hook}} and resumes the handle it returns.

---

The awaiter `connect`s the sender, in its constructor, to a receiver
holding the coroutine handle; `await_suspend` only calls `start`.
`with_awaitable_senders<Promise>` is the promise base that supplies the
`await_transform` applying `as_awaitable` to every operand, and the
stopped hook, delegating to the continuation's promise (or terminating
if it has none).
