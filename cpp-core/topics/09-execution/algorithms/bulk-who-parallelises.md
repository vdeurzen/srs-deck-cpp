---
id: execution-bulk-who-parallelises
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
refs:
  - https://eel.is/c++draft/exec.bulk
  - https://eel.is/c++draft/exec.par.scheduler
requires:
  - execution-bulk
  - execution-scheduler-and-schedule
---

## `bulk(sndr, std::execution::par, n, f)` is written with a parallel policy. What decides whether it actually runs in parallel?

---

**The scheduler it completes on; the policy only *permits* parallelism.**

By default `bulk` becomes a plain loop over `[0, n)`, run on whatever
thread finished `sndr`. A scheduler such as
`parallel_scheduler` customises it and spreads the indices over its
workers. So `f` must be safe to run concurrently with itself either way.
