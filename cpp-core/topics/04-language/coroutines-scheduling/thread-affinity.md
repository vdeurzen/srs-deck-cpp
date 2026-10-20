---
id: coroutines-scheduling-thread-affinity
kind: cloze
version: 1
level: 4
tags: [coroutines, scheduling, concurrency]
requires:
  - coroutines-scheduling-schedule-awaiter
elaborate: Where in a request handler of yours would a `co_await` force you to release a lock or re-read per-thread state?
refs:
  - https://en.cppreference.com/w/cpp/thread/lock_guard
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

The code after a `co_await` runs on {{c1::whichever thread resumed the
handle::which thread?}}, and nothing but the keyword marks that
boundary. So a {{c2::held lock::any RAII lock guard}} must never span a
`co_await`, and anything cached from {{c3::thread_local storage::a
storage duration}} before the suspension is stale afterwards.

---

A lock released by a different thread from the one that acquired it is
undefined behaviour for every standard mutex. Per-thread state includes
an arena, a random engine or a "current request" pointer, and a
`this_thread::get_id()` captured earlier no longer names the running
thread.
