---
id: execution-schedule-sender
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
refs:
  - https://eel.is/c++draft/exec.schedule
  - https://eel.is/c++draft/exec.get.compl.sched
requires:
  - execution-scheduler-and-schedule
---

A scheduler enters a pipeline as a sender: `schedule(sch)` returns a
sender that completes with {{c1::no values::how many arguments to
set_value?}}, on {{c2::sch's execution context::which thread?}}. "Get me
onto that context" is then just another piece of async work, so
`schedule(pool) | then(f)` runs `f` on the pool.
