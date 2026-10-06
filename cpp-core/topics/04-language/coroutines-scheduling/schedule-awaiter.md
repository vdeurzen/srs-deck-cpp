---
id: coroutines-scheduling-schedule-awaiter
kind: basic
version: 1
level: 4
tags: [coroutines, scheduling]
requires:
  - coroutines-await-suspend-return-types
  - coroutines-scheduling-type-erased-handle
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

## What does `co_await pool.schedule();` do to the rest of the function?

---

**Moves it onto the pool.** Everything above ran on the calling thread;
everything below runs on whichever worker takes the handle. The awaiter
is never ready, *publishes* the handle in `await_suspend` and returns
`void` — never `h.resume()`, which would run the work here and nest
stack frames. Refinement: `await_ready()` true when already on the pool
makes the common case free.

```cpp
struct Scheduler {
  auto schedule() noexcept {
    struct Awaiter {
      Scheduler& sched;
      bool await_ready() const noexcept { return false; }
      void await_suspend(std::coroutine_handle<> h) const noexcept {
        sched.enqueue(h);            // publish; do not resume here
      }
      void await_resume() const noexcept {}
    };
    return Awaiter{*this};
  }
};
```
