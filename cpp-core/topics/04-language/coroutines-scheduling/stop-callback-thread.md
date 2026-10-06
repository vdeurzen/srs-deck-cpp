---
id: coroutines-scheduling-stop-callback-thread
kind: cloze
version: 1
level: 5
tags: [coroutines, scheduling, concurrency]
requires:
  - coroutines-scheduling-stop-token-plumbing
refs:
  - https://en.cppreference.com/w/cpp/thread/stop_callback
  - https://man7.org/linux/man-pages/man3/io_uring_prep_cancel.3.html
---

A `std::stop_callback` registered by a suspended coroutine's awaiter
can fire on {{c1::the thread that requested the stop::not the one that
suspended, so everything it touches must be thread-safe}}, which is why
it usually does nothing but hand a cancel request to the ring rather
than resuming the coroutine itself. And a cancelled operation still
{{c2::completes exactly once::with -ECANCELED, or successfully if it
won the race}}, so the coroutine resumes normally and decides what a
cancelled result means — there is no unwinding a suspended frame from
outside.
