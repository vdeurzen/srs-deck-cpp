---
id: coroutines-scheduling-returning-to-a-context
kind: basic
version: 1
level: 4
tags: [coroutines, scheduling]
requires:
  - coroutines-scheduling-schedule-awaiter
refs:
  - https://en.cppreference.com/w/cpp/language/coroutines#co_await
  - https://en.cppreference.com/w/cpp/execution
---

## A coroutine hops to a worker pool, does its work, and must finish back on the UI (or I/O) thread that called it. How do you arrange that?

---

Capture the context you came from *before* leaving it, and hop back
explicitly at the end:

```cpp
task render(UiContext& ui, Pool& pool) {
  auto home = ui.scheduler();        // captured on the UI thread
  co_await pool.schedule();          // now on a worker
  auto image = expensive(...);       // CPU-bound, off the UI thread
  co_await home.schedule();          // back on the UI thread
  ui.present(image);                 // safe to touch UI state
}
```

The awaiter for `home.schedule()` posts the handle to the UI loop, so
resumption happens there. Written this way the thread each line runs on
is readable from the source, which is the whole ergonomic argument for
coroutines over callbacks.

Two refinements matter. First, make the hop *unconditional but cheap*:
an `await_ready()` that returns `true` when already on the target
context means the round trip costs nothing when the work happened to
complete inline. Second, do not rely on a completion delivering you
anywhere in particular — a library that resumes you on its own I/O
thread is entitled to, so if the code after a `co_await` touches
context-bound state, hop first and do not assume.

`std::execution` names this pattern rather than leaving it to
convention: `continues_on(sndr, sched)` is exactly "run the rest of this
chain on that scheduler", and `starts_on(sched, sndr)` is "begin it
there".
