---
id: coroutines-scheduling-io-uring-lifetime
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, io, lifetimes, misconception]
elaborate: In your own async code, what is the equivalent of "the kernel still holds this pointer" — a callback registered elsewhere, a pending timer, a detached thread? How does that operation get cancelled and joined?
refs:
  - https://man7.org/linux/man-pages/man3/io_uring_prep_cancel.3.html
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/destroy
---

## "To cancel an in-flight `io_uring` read, destroy the suspended coroutine — `destroy()` frees the frame and the operation goes away." Why is this a use-after-free?

---

Because the kernel is holding pointers into that frame. When the read
was submitted, the SQE captured the buffer address and the `user_data`
pointing at the awaiter — both of which live in the coroutine frame.
`destroy()` frees the frame immediately; the operation is still queued.
When it completes, the kernel writes the bytes into freed memory and
the completion loop dereferences a dangling `user_data`.

Cancellation in a completion-based API is therefore **asynchronous**,
in three steps:

1. submit a cancel request — `io_uring_prep_cancel(sqe, op, 0)`, naming
   the same `user_data`;
2. **wait for the original operation's completion** to arrive. It will,
   exactly once: either with `-ECANCELED`, or with a successful result
   because the read had already finished before the cancel landed;
3. only then let the frame be destroyed.

The invariant to hold on to: every submitted operation owns a slot in
the frame until its completion is observed, and "cancelled" is a way
for an operation to *finish*, not a way to make it un-happen. That is
the same reason `std::jthread`'s destructor joins rather than detaches,
and the same reason `std::execution` models cancellation as the
`set_stopped` completion channel instead of an out-of-band kill.

Structured concurrency is what makes this liveable: if a parent
coroutine always awaits its children, a child's frame cannot outlive
the parent's `co_await`, and the only place that needs this cancel-then-
join dance is the runtime's own shutdown path.
