---
id: coroutines-scheduling-explain-io-completion
kind: explain
version: 1
level: 5
tags: [coroutines, scheduling, io]
requires:
  - coroutines-scheduling-frame-stable-address
  - coroutines-scheduling-stop-token-plumbing
  - coroutines-symmetric-transfer
refs:
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://en.cppreference.com/w/cpp/thread/stop_callback
---
Sketch how a coroutine runtime drives `io_uring`: where an operation's
state lives, how a completion resumes the right coroutine, and how
cancellation works without a use-after-free.
---
- [ ] Operation state lives in the coroutine frame — the frame has a stable address, so the awaiter itself is the `io_uring` `user_data` and needs no allocation
- [ ] The completion loop writes `cqe->res` into the awaiter *before* resuming it; `await_resume` turns a negative result into an exception or `std::expected`
- [ ] Continuations resume by symmetric transfer (`await_suspend` returning a handle, `std::noop_coroutine()` at the root) so synchronous completions do not grow the stack
- [ ] Cancellation is a `std::stop_token` in the promise plus a `std::stop_callback` that submits a cancel; the operation still completes exactly once, and the frame is destroyed only after that completion is observed
- [ ] The completion loop does not resume inline on the I/O thread: it hands the handle to the pool, so the I/O thread never runs user code and every thread change stays an explicit `co_await schedule()`
