---
id: coroutines-scheduling-explain-runtime-design
kind: explain
version: 3
level: 5
tags: [coroutines, scheduling, io]
requires:
  - coroutines-scheduling-explain-io-completion
  - coroutines-scheduling-structured-concurrency
  - coroutines-scheduling-no-fire-and-forget
  - coroutines-scheduling-stop-callback-thread
  - coroutines-scheduling-explain-context-flow
elaborate: Where does each coroutine's scheduler come from in this runtime, given there is no global?
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://wg21.link/p2300
---
An interviewer asks why, in your coroutine runtime over a thread pool and
`io_uring`, a coroutine frame is never destroyed too early. Explain it to them.
---
- [ ] Parents await their children, so each child's frame lives inside its parent's `co_await`
- [ ] So a child may borrow its parent's locals, such as I/O buffers, for its whole run
- [ ] No task is detached: work is spawned into a scope that someone awaits before it ends
- [ ] An awaiter in the frame is the operation's `user_data`, so the frame must outlive the kernel's use of it
- [ ] Cancellation is an early completion: a stop callback submits a cancel, and the frame dies only after that completion
