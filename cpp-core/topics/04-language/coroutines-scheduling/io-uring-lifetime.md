---
id: coroutines-scheduling-io-uring-lifetime
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, io, lifetimes, misconception]
requires:
  - coroutines-scheduling-io-uring-completion
elaborate: In your own async code, what is the equivalent of "the kernel still holds this pointer" — a callback registered elsewhere, a pending timer, a detached thread? How does that operation get cancelled and joined?
refs:
  - https://man7.org/linux/man-pages/man3/io_uring_prep_cancel.3.html
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/destroy
---

## "To cancel an in-flight `io_uring` read, destroy the suspended coroutine — `destroy()` frees the frame and the operation goes away." Why is this a use-after-free?

---

**The kernel still holds pointers into that frame.** The SQE holds the
buffer address and the awaiter's address as `user_data`; `destroy()`
frees both while the read is queued. Cancel is asynchronous: submit
`io_uring_prep_cancel` for the same `user_data`, *await the original
completion* (exactly once: `-ECANCELED` or a late success), then
destroy. "Cancelled" is a way to finish, never to un-happen.
