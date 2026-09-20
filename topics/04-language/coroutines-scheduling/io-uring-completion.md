---
id: coroutines-scheduling-io-uring-completion
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, io]
refs:
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/from_address
---

## How does an `io_uring` completion find its way back to the coroutine that submitted the operation?

---

Through the ring's `user_data` field, which is an opaque 64-bit value
the kernel copies from the submission queue entry to the completion
queue entry. Put the address of the *operation state* in it — which,
for a coroutine, is the awaiter object sitting in the frame:

```cpp
struct ReadOp {                      // lives in the coroutine frame
  io_uring& ring;
  int fd; std::span<std::byte> buf; std::uint64_t offset;
  std::coroutine_handle<> waiter;
  int result = 0;

  bool await_ready() const noexcept { return false; }
  void await_suspend(std::coroutine_handle<> h) {
    waiter = h;
    io_uring_sqe* sqe = io_uring_get_sqe(&ring);       // may be null: SQ full
    io_uring_prep_read(sqe, fd, buf.data(), buf.size(), offset);
    io_uring_sqe_set_data(sqe, this);
    io_uring_submit(&ring);
  }
  int await_resume() const { return result; }          // filled in by the loop
};
```

and the completion loop hands the result over, then resumes:

```cpp
io_uring_cqe* cqe;
while (io_uring_peek_cqe(&ring, &cqe) == 0) {
  auto* op = static_cast<ReadOp*>(io_uring_cqe_get_data(cqe));
  op->result = cqe->res;              // >= 0 bytes, or -errno
  io_uring_cqe_seen(&ring, cqe);
  op->waiter.resume();                // may run arbitrary user code
}
```

Three things make this sound. The coroutine frame has a **stable
address**, so a pointer into it survives the suspension — this is why
the awaiter, and not a separately allocated control block, can be the
`user_data`. The result is delivered *before* the resume, so
`await_resume()` has something to return and can turn a negative
`res` into an exception or a `std::expected`. And `io_uring_get_sqe`
returning null is a real case: the submission queue is a fixed-size
ring, so a design either submits and retries, or bounds the number of
operations in flight.

Storing `h.address()` directly as `user_data` also works when there is
nothing to deliver — but then there is nowhere to put `cqe->res`, so
the awaiter usually wins.
