---
id: coroutines-scheduling-thread-affinity
kind: cloze
version: 1
level: 4
tags: [coroutines, scheduling, concurrency]
refs:
  - https://en.cppreference.com/w/cpp/thread/lock_guard
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
---

A `co_await` is a place where the thread can change underneath you: the
code after it runs on {{c1::whichever thread resumed the handle::the
worker that took it off the queue, not necessarily the one that
suspended}}, and nothing in the source marks the boundary except the
keyword itself. Three things stop being true across that line. A
{{c2::std\::lock_guard::or any RAII lock held across the suspension}}
must never span a `co_await`, because the mutex would then be unlocked
by a different thread than locked it — undefined behaviour for
`std::mutex`, and a deadlock waiting to happen even where it is
tolerated. Anything cached from {{c3::thread_local storage::including
an arena, a random engine, or a "current request" pointer}} before the
suspension is stale afterwards. And a `this_thread::get_id()` captured
earlier no longer identifies the running thread.

The discipline is to treat every `co_await` as a function boundary: take
locks after it and release them before the next one, re-read
thread-local state on each side, and make the resumption context
explicit with {{c4::co_await sched.schedule()::an explicit hop to a
known context, rather than assuming which thread you are on}} whenever
the following code cares where it runs.
