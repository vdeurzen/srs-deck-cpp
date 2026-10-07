---
id: execution-sync-wait-run-loop
kind: cloze
version: 1
level: 5
tags: [execution, async, c++26, scheduling]
refs:
  - https://eel.is/c++draft/exec.sync.wait
  - https://eel.is/c++draft/exec.run.loop
requires:
  - execution-sync-wait
  - execution-environment-queries
---

`sync_wait` owns a `run_loop` and answers `get_scheduler` in its
receiver's environment with {{c1::that run_loop's scheduler::whose
context?}}. So a sender that asks its environment for a scheduler, and
has none of its own, runs its work on {{c2::the thread blocked in
sync_wait::which thread drives a run_loop?}}: the caller is not just
waiting, it is available to do the work.
