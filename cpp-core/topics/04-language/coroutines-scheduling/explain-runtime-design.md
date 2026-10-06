---
id: coroutines-scheduling-explain-runtime-design
kind: explain
version: 2
level: 5
tags: [coroutines, scheduling, io]
requires:
  - coroutines-scheduling-explain-context-flow
  - coroutines-scheduling-explain-io-completion
  - coroutines-scheduling-structured-concurrency
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://man7.org/linux/man-pages/man7/io_uring.7.html
  - https://wg21.link/p2300
---
Put it together: in a coroutine runtime over a thread pool and
`io_uring`, explain how each design rule follows from one property of
coroutines — context flow, thread changes, operation state,
cancellation and lifetimes.
---
- [ ] Because context travels by argument into the promise and out through promise-querying awaiters, nothing is global — so two runtimes, or a test double, can coexist in one process
- [ ] Because completions are re-posted to the pool rather than resumed inline, the only thread change is an explicit `co_await schedule()`, and the thread each line runs on is readable from the source
- [ ] Because the frame has a stable address, the awaiter is the operation state (`user_data`, queue node) — which is also why the frame may not be destroyed while the kernel still holds that address
- [ ] Because every operation completes exactly once, cancellation is just an early completion: a stop callback submits a cancel, the coroutine resumes and reads the result, and only then may the frame die
- [ ] Because parents await children, lifetimes nest: buffers are parent locals, errors surface at the parent's `co_await`, and the only detached things, the I/O thread and `sync_wait`, are owned by `main`
