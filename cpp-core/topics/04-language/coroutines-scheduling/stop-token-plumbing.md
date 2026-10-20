---
id: coroutines-scheduling-stop-token-plumbing
kind: cloze
version: 1
level: 5
tags: [coroutines, scheduling, concurrency]
requires:
  - coroutines-scheduling-context-without-globals
  - parsons-jthread-stop-token
elaborate: What would go wrong if the cancel registration outlived the suspension, and what about its scope prevents that?
refs:
  - https://en.cppreference.com/w/cpp/thread/stop_token
  - https://en.cppreference.com/w/cpp/thread/stop_callback
---

Cancellation travels the same road as the scheduler: the stop token is
{{c1::stored in the promise::a location}} and reached by an awaiter
through `h.promise()`, so a child coroutine inherits its parent's token
by being handed it. An awaiter that suspends on real work registers a
{{c2::std\::stop_callback::a std\:: RAII type}} against that token in
`await_suspend` and destroys it in `await_resume`; that object submits
the cancel request to the underlying API.

---

The cancel request is whatever the API offers: an
`IORING_OP_ASYNC_CANCEL`, an `epoll` deregistration, a condition
variable notification. Prefer `std::inplace_stop_token` (C++26, from
P2300; not in GCC 14) where the source and the token share a scope: it
avoids the shared-state allocation `std::stop_token` needs.
