---
id: coroutines-eager-start-exception
kind: basic
version: 1
level: 4
tags: [coroutines]
requires:
  - coroutines-eager-vs-lazy-start
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#Execution
  - https://eel.is/c++draft/dcl.fct.def.coroutine
---

## An eager coroutine throws before its first `co_await`. Who sees the exception?

---

**`unhandled_exception()`, before the call that created the coroutine
has returned.** The return object already exists, so a promise that
stores `std::current_exception()` can hand it over later — but only if
`final_suspend()` suspends; with `suspend_never` the frame
self-destroys, taking the stored exception with it, and the call fails
silently. A promise that rethrows instead propagates it out of the
creating call.
