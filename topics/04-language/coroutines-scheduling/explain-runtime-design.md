---
id: coroutines-scheduling-explain-runtime-design
kind: explain
version: 1
level: 5
tags: [coroutines, scheduling, io]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://wg21.link/p2300
---
Sketch the design of a small coroutine runtime over a thread pool and
`io_uring` that uses no globals and no thread-locals. Name the pieces
and say how each one gets what it needs.
---
- [ ] Ownership at the top: `main` constructs the pool and the I/O context on the stack and passes references down; nothing is looked up, so tests can construct their own
- [ ] The context reaches a coroutine through its arguments, and the promise constructor — which receives the coroutine's own arguments — stores it, so the body never repeats it
- [ ] Awaiters that need the context template `await_suspend` on the promise type and read `h.promise()`, the coroutine equivalent of an environment query
- [ ] The scheduler's currency is `std::coroutine_handle<>`: type-erased, so one queue serves every coroutine type without a base class or `std::function`
- [ ] `co_await sched.schedule()` is the only way to change thread, so the thread each line runs on is readable from the source
- [ ] Operation state lives in the coroutine frame — the frame has a stable address, so the awaiter itself can be the `io_uring` `user_data` and needs no allocation
- [ ] The completion loop writes `cqe->res` into the awaiter *before* resuming it; `await_resume` turns a negative result into an exception or `std::expected`
- [ ] Continuations resume by symmetric transfer (`await_suspend` returning a handle, `std::noop_coroutine()` at the root) so synchronous completions do not grow the stack
- [ ] Cancellation is a `std::stop_token` in the promise plus a `std::stop_callback` that submits a cancel; the operation still completes exactly once, and the frame is destroyed only after that completion is observed
- [ ] Structured concurrency throughout: parents await children, so child frames nest inside parents, buffers can be parent locals, and errors surface at the parent's `co_await`
- [ ] One ring per I/O thread, submitted to only by its owner; other threads hand work over through the pool's queue rather than sharing the ring
