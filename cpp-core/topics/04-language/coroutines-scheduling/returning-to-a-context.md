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

**Capture the home scheduler before leaving; hop back explicitly at the
end.**

```cpp
task render(UiContext& ui, Pool& pool) {
  auto home = ui.scheduler();        // captured on the UI thread
  co_await pool.schedule();          // now on a worker
  auto image = expensive();          // CPU-bound, off the UI thread
  co_await home.schedule();          // back on the UI thread
  ui.present(image);                 // safe to touch UI state
}
```

`home.schedule()`'s awaiter posts the handle to the UI loop, so
resumption happens there, and the thread each line runs on is readable
from the source. Never assume where a completion resumes you: if the
next line touches context-bound state, hop first.
