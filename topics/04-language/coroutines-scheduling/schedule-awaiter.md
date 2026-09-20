---
id: coroutines-scheduling-schedule-awaiter
kind: basic
version: 1
level: 4
tags: [coroutines, scheduling]
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
  - https://en.cppreference.com/w/cpp/coroutine/coroutine_handle
---

## What does `co_await pool.schedule();` do, and what is the shape of the awaiter behind it?

---

It moves the rest of the function onto the pool. Everything above that
line ran on the calling thread; everything below runs on whichever
worker picks the handle up:

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

Three details make it a *good* one rather than merely working:

- `await_suspend` **publishes** the handle and returns `void`. It must
  not call `h.resume()` itself: that would run the work on the calling
  thread, which is the opposite of what was asked, and it would nest
  stack frames.
- After `enqueue` returns, another thread may already have resumed,
  finished and destroyed the coroutine — so the awaiter must touch
  nothing afterwards, not even its own members. The awaiter lives in
  the frame that just became someone else's.
- `enqueue` should not throw or allocate. Real schedulers get this by
  putting the intrusive queue node *inside the awaiter*, which already
  lives in the coroutine frame: linking it into a lock-free list is a
  pointer write, and the frame is stable for as long as the operation
  lasts.

An awaiter that returns `true` from `await_ready()` when the caller is
already on the target context turns the common case into no suspension
at all.
