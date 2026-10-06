---
id: coroutines-scheduling-publish-then-hands-off
kind: basic
version: 1
level: 4
tags: [coroutines, scheduling, concurrency]
requires:
  - coroutines-scheduling-schedule-awaiter
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle/resume
---

## `await_suspend` has just enqueued the coroutine's handle on a pool and has not returned yet. What may it still touch?

---

**Nothing that lives in the frame — not even the awaiter's own
members.** Publishing the handle gives the frame to another thread,
which may already have resumed, finished and destroyed it before
`enqueue` returns. So write everything the resumed coroutine needs
*before* publishing, publish last, and return with your hands off.
