---
id: execution-scheduler-and-schedule
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
elaborate: C++26 ships `run_loop` (a context you drive yourself) and `parallel_scheduler`. Where in your code would a scheduler arrive as an argument instead of a global executor?
refs:
  - https://eel.is/c++draft/exec.sched
  - https://eel.is/c++draft/exec.par.scheduler
  - https://wg21.link/p2300
requires:
  - execution-sender-is-a-description
---

## In `std::execution`, what is a *scheduler*?

---

**A cheap, copyable, equality-comparable handle to an execution
context.**

A thread pool, an I/O thread, a GPU queue or a run loop is the
context; the scheduler is only the permission to put work on it. So it
is passed by value as freely as a pointer, as an argument like any
other dependency.
