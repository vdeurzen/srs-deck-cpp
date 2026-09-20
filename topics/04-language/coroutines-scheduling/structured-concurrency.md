---
id: coroutines-scheduling-structured-concurrency
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, lifetimes]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://wg21.link/p2300
---

## What does "structured concurrency" buy a coroutine runtime that has no global scope object to park detached work in?

---

It buys the lifetime argument. If every child coroutine is awaited by
its parent — directly, or through a `when_all` that joins several — then
a child's frame is strictly nested inside the parent's `co_await`
expression. Three consequences follow, and they are exactly the
problems a detached task forces you to solve with allocation and
reference counting:

- **References into the parent are safe.** A child can take
  `std::span<std::byte>` over a buffer that is a local of the parent,
  because the parent is suspended, not gone, for the whole time the
  child runs. No `shared_ptr` to keep data alive.
- **Cancellation has a direction.** A stop request enters at the top
  and propagates down the await chain; the parent cannot finish before
  its children have completed, cancelled or otherwise, so there is no
  window where work outlives the thing that asked for it.
- **Errors have somewhere to go.** A child's exception surfaces at the
  parent's `co_await`, which is an ordinary `try`/`catch` site — rather
  than at a detached task's `unhandled_exception()`, which has no
  caller to hand it to and usually ends in `std::terminate`.

The cost is discipline: "fire and forget" has to become "spawn into a
scope that someone awaits". That is why the sender/receiver work pairs
structured concurrency with an explicit async scope type, and why the
two genuinely detached things in a well-built runtime — the I/O thread
and the top-level `sync_wait` — are both owned by `main`, on the stack,
and passed down as references.
