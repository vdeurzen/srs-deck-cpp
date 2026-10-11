---
id: coroutines-scheduling-thread-affinity
kind: cloze
version: 1
level: 4
tags: [coroutines, scheduling, concurrency]
requires:
  - coroutines-scheduling-schedule-awaiter
refs:
  - https://en.cppreference.com/w/cpp/thread/lock_guard
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

A `co_await` is a place where the thread can change underneath you: the
code after it runs on {{c1::whichever thread resumed the handle::which
thread?}}, and nothing in the source marks the boundary except the
keyword itself. Three things stop being true across that line. A
{{c2::held lock::any RAII lock guard}} must never span a `co_await`,
because the thread releasing it would not be the one that acquired it —
undefined behaviour for every standard mutex, and a deadlock waiting to
happen where an implementation tolerates it. Anything cached from
{{c3::thread_local storage::including an arena, a random engine, or a
"current request" pointer}} before the suspension is stale afterwards.
And a `this_thread::get_id()` captured earlier no longer identifies the
running thread.
