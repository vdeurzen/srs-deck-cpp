---
id: chunks-io-uring-submit
kind: chunk
version: 1
level: 5
tags: [idioms, coroutines, io]
requires:
  - coroutines-scheduling-io-uring-completion
expose_ms: 7000
compile: null
refs:
  - https://man7.org/linux/man-pages/man3/io_uring_get_sqe.3.html
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
---

```cpp
io_uring_sqe* sqe = io_uring_get_sqe(&ring);
io_uring_prep_read(sqe, fd, buf.data(), buf.size(), offset);
io_uring_sqe_set_data(sqe, this);
io_uring_submit(&ring);
```

---

The submission half of a coroutine-friendly `io_uring` operation, as it
appears inside `await_suspend`. Four steps, always in this order: take
a submission queue entry, describe the operation, attach the
`user_data` that will come back on completion, and submit.

`this` is the awaiter, which lives in the coroutine frame and therefore
has a stable address for as long as the operation is in flight — that
is what makes a completion-to-coroutine bridge allocation-free. Note
the one line with a hidden failure mode: `io_uring_get_sqe` returns
null when the submission ring is full, so production code either
submits and retries or caps the number of operations in flight.

This Deck cannot compile-check this Card — `liburing` is not part of
the standard library and is not available to the Compiler Explorer
configuration the Deck targets — so reproduction is graded by
whitespace-normalised equality (SPEC §4.7).
