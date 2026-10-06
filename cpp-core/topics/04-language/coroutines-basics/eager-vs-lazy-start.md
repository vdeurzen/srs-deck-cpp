---
id: coroutines-eager-vs-lazy-start
kind: basic
version: 1
level: 3
tags: [coroutines]
requires:
  - coroutines-promise-type-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/suspend_always
---

## `initial_suspend()` returns `std::suspend_always` on one coroutine type and `std::suspend_never` on another. What does each choice mean for when the body runs?

---

**`suspend_always` is lazy, `suspend_never` is eager.** Lazy: the call
allocates the frame, builds the return object and suspends *before the
first statement*; nothing runs until someone resumes the handle, so the
caller picks when and where (generators, `task`). Eager: the body runs
at once, on the calling thread, up to its first real suspension, before
the caller holds anything.
