---
id: coroutines-scheduling-io-uring-completion
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, io]
requires:
  - coroutines-scheduling-frame-stable-address
refs:
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/from_address
---

## How does an `io_uring` completion find its way back to the coroutine that submitted the operation?

---

**Through `user_data`: an opaque 64-bit value the kernel copies from
the SQE to the CQE.** Submit with the awaiter's address; complete by
casting it back, storing the result, then resuming:

```cpp
io_uring_sqe_set_data(sqe, this);                               // on submit
auto* op = static_cast<ReadOp*>(io_uring_cqe_get_data(cqe));    // on completion
op->result = cqe->res;              // >= 0 bytes, or -errno — before the resume
op->waiter.resume();
```

The result is written *before* the resume, so `await_resume()` can
return it or turn a negative `res` into an exception. A bare
`h.address()` would leave nowhere to put it.
