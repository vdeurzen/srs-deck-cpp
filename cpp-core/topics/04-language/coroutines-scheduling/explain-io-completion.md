---
id: coroutines-scheduling-explain-io-completion
kind: explain
version: 2
level: 5
tags: [coroutines, scheduling, io]
requires:
  - coroutines-scheduling-io-uring-lifetime
  - coroutines-scheduling-stop-callback-thread
  - coroutines-symmetric-transfer
elaborate: How would you cancel an in-flight read without freeing a frame the kernel still points into?
refs:
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://en.cppreference.com/w/cpp/thread/stop_callback
---
An interviewer asks how a coroutine runtime suspends a coroutine on an
`io_uring` read and resumes it when the read completes. Explain it to them.
---
- [ ] The awaiter lives in the coroutine frame, which never moves, so it can hold the operation's state
- [ ] Its address goes in the SQE's `user_data`; the kernel copies it to the CQE, identifying the coroutine
- [ ] The completion loop writes `cqe->res` into the awaiter before resuming; `await_resume` turns a negative result into an error
- [ ] A finished child resumes its parent by symmetric transfer, so synchronous completions do not grow the stack
- [ ] The frame must not be destroyed while the kernel still holds pointers into it, not even to cancel
