---
id: execution-scheduler-and-schedule
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
requires:
  - execution-sender-is-a-description
---

## What is a scheduler, and how does one get into a pipeline?

---

A scheduler is a **cheap, copyable, equality-comparable handle to an
execution context** — a thread pool, an I/O thread, a GPU queue, a run
loop. It is not the context itself; it is the permission to put work
on it, which is why it is passed by value as freely as a pointer.

It enters a pipeline as a sender: `schedule(sched)` returns a sender
that completes with **no values**, on `sched`'s context. That is the
whole trick — "get me onto that context" is just another piece of
async work, so everything else composes with it:

```cpp
auto work = schedule(pool)          // arrive on the pool
          | then([] { return load(); })
          | continues_on(ui)        // hop to the UI context
          | then([](auto data) { show(data); });
```

A sender's environment can be asked where it will finish, with
`get_completion_scheduler<set_value_t>(get_env(sndr))`, and adaptors
use that to optimise — a `continues_on` to the context you are already
completing on can disappear entirely.

The standard ships `run_loop` as a context you drive yourself
(`loop.get_scheduler()`, `loop.run()`, `loop.finish()`) and
`sync_wait` uses one internally; for a thread pool C++26 adds
`parallel_scheduler` (from `get_parallel_scheduler()`, P2079), and
anything else comes from a library. The contract is what matters: any type
satisfying `scheduler` slots into the same pipelines, which is what
makes "no global executor" practical — the scheduler arrives as an
argument, like any other dependency.
