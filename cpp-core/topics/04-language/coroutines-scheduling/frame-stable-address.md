---
id: coroutines-scheduling-frame-stable-address
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, io]
requires:
  - coroutines-scheduling-schedule-awaiter
  - coroutines-frame-allocation
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
---

## Why can the awaiter object itself — not a separately allocated control block — be the scheduler's intrusive queue node or an `io_uring` operation's `user_data`?

---

**Because the awaiter lives in the coroutine frame, and the frame does
not move.** From allocation until `destroy()` the frame has one stable
address, so a pointer into it survives the suspension: linking the
awaiter into a lock-free ready list is a pointer write, and
`io_uring_sqe_set_data(sqe, this)` needs no allocation. The operation
state was paid for at coroutine creation.
