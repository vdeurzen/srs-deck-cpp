---
id: coroutines-eager-vs-lazy-start
kind: basic
version: 1
level: 3
tags: [coroutines]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines
  - https://en.cppreference.com/w/cpp/coroutine/suspend_always
---

## `initial_suspend()` returns `std::suspend_always` on one coroutine type and `std::suspend_never` on another. What does each choice mean for when the body runs?

---

`std::suspend_always` makes the coroutine **lazy**: calling it allocates
the frame, constructs the promise, builds the return object and then
suspends *before the first statement of the body*. Nothing the author
wrote runs until someone resumes the handle. This is what a generator
and a `task` want — the caller decides when, and on which thread, the
work starts.

`std::suspend_never` makes it **eager**: the body runs immediately, on
the calling thread, up to the first real suspension point, and only then
does the caller get its return object back. This is what a
fire-and-forget `detached_task` wants, and it is also the version that
surprises people — a coroutine called for its side effects has already
performed half of them before the caller holds anything.

The two differ in error handling too: with an eager start, an exception
thrown before the first `co_await` reaches `unhandled_exception()` before
the call that created the coroutine has even returned. The return object
already exists (`get_return_object()` ran first), so a promise that
stores `std::current_exception()` can still hand it over — but only if
`final_suspend()` suspends; a self-destroying frame takes the stored
exception with it, and the caller sees a silently failed call.
