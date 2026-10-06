---
id: coroutines-scheduling-stop-token-plumbing
kind: cloze
version: 1
level: 5
tags: [coroutines, scheduling, concurrency]
requires:
  - coroutines-scheduling-context-without-globals
  - coroutines-scheduling-io-uring-lifetime
  - parsons-jthread-stop-token
refs:
  - https://en.cppreference.com/w/cpp/thread/stop_token
  - https://en.cppreference.com/w/cpp/thread/stop_callback
---

Cancellation travels the same road as the scheduler: it is
{{c1::stored in the promise::put there by the promise constructor from
the coroutine's own arguments, not read from a global}} and reached by
an awaiter that queries `h.promise()`, so a child coroutine inherits
its parent's token by being handed it. The awaiter that suspends on
real work registers a {{c2::std\::stop_callback::constructed in
await_suspend, destroyed in await_resume}} against that token, and the
callback is what submits the cancel request to the underlying API —
an `IORING_OP_ASYNC_CANCEL`, an `epoll` deregistration, a condition
variable notification.

Two details keep it correct. The callback can fire on
{{c3::the thread that requested the stop::not the one that suspended,
so everything it touches must be thread-safe}}, which is why it
usually does nothing but hand a request to the ring rather than
resuming the coroutine itself. And a cancelled operation still
{{c4::completes exactly once::with -ECANCELED, or successfully if it
won the race}}, so the coroutine resumes normally and decides what a
cancelled result means — there is no unwinding out of a suspended
frame from outside.

Prefer `std::inplace_stop_token` (C++26, from P2300; not in GCC 14)
where the source and the token share a scope: it avoids the shared-state
allocation `std::stop_token` needs.
