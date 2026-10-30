---
id: coroutines-scheduling-explain-context-flow
kind: explain
version: 2
level: 5
tags: [coroutines, scheduling]
requires:
  - coroutines-scheduling-awaiter-queries-promise
  - coroutines-scheduling-thread-affinity
  - coroutines-scheduling-no-fire-and-forget
elaborate: After `co_await pool.schedule()`, which thread runs the next line, and what must not be held across it?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---
An interviewer asks how every coroutine in a thread-pool runtime finds its
scheduler without a global or a thread-local. Explain it to them.
---
- [ ] `main` owns the pool and passes it down by reference, so nothing is looked up and tests build their own
- [ ] The pool reaches each coroutine as an argument; a promise constructor taking the same arguments stores it
- [ ] An awaiter templates `await_suspend` on the promise type and reads the pool through `h.promise()`
- [ ] Or the awaitable itself carries the pool, as `co_await pool.schedule()` does
- [ ] The pool queues `std::coroutine_handle<>`: type-erased, so one queue serves every coroutine type
