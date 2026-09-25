---
id: chunks-io-uring-completion-loop
kind: chunk
version: 1
level: 5
tags: [idioms, coroutines, io]
expose_ms: 10000
compile: null
refs:
  - https://man7.org/linux/man-pages/man3/io_uring_peek_cqe.3.html
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
---

```cpp
io_uring_cqe* cqe = nullptr;
while (io_uring_peek_cqe(&ring, &cqe) == 0) {
  auto* op = static_cast<ReadOp*>(io_uring_cqe_get_data(cqe));
  op->result = cqe->res;
  io_uring_cqe_seen(&ring, cqe);
  op->waiter.resume();
}
```

---

The completion half, and the shape of every event loop that drives
coroutines: recover the operation from `user_data`, **deliver the
result before resuming**, tell the kernel the entry has been consumed,
and only then hand control to the coroutine.

The ordering is load-bearing. `resume()` runs arbitrary user code that
may submit new operations, complete the whole task, and destroy the
frame that `op` points into — so everything that touches `op` or `cqe`
must happen first. `cqe->res` follows the kernel convention: at least
zero is a byte count, negative is `-errno`, which `await_resume`
translates into an exception or a `std::expected`.

This Deck cannot compile-check this Card — `liburing` is not part of
the standard library and is not available to the Compiler Explorer
configuration the Deck targets — so reproduction is graded by
whitespace-normalised equality (SPEC §4.7).
