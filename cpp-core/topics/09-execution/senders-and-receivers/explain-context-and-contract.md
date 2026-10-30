---
id: execution-explain-context-and-contract
kind: explain
version: 2
level: 5
tags: [execution, async, c++26, scheduling]
elaborate: Besides where it runs, what does a sender's type already promise about how it can complete, and when is a receiver that cannot take one of those completions rejected?
refs:
  - https://eel.is/c++draft/exec.sched
  - https://eel.is/c++draft/exec.starts.on
  - https://eel.is/c++draft/exec.continues.on
requires:
  - execution-starts-on-vs-continues-on
  - execution-trace-continuation-thread
---
A colleague used to thread pools asks how a `std::execution` pipeline
decides which thread runs each of its steps. Explain it to them.
---
- [ ] A scheduler is a cheap, copyable handle to an execution context, passed in like any other argument
- [ ] `schedule(sch)` is a sender completing on that context, so "go there" composes like any other work
- [ ] `starts_on(sch, sndr)` moves to `sch` before `sndr` starts, so `sndr`'s own work begins there
- [ ] `continues_on(sndr, sch)` moves after `sndr` completes, so everything downstream runs on `sch`
- [ ] Without such a hop, each step runs wherever its predecessor completed, even inline on the starting thread
