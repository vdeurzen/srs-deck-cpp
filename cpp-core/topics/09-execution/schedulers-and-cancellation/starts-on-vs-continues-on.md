---
id: execution-starts-on-vs-continues-on
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
elaborate: Describe a pipeline of your own that needs `continues_on`, and the context it hops to.
refs:
  - https://eel.is/c++draft/exec.starts.on
  - https://eel.is/c++draft/exec.continues.on
  - https://wg21.link/p3175
requires:
  - execution-schedule-sender
---

`starts_on(sch, sndr)` transitions to `sch` {{c1::before starting
sndr::so sndr's own work begins on that context}}. `continues_on(sndr,
sch)` transitions {{c2::after sndr completes::so everything downstream
of it runs on the new context}}. Both exist because a completion
otherwise arrives on {{c3::whichever context the operation happened to
finish on::which context?}}.

---

`starts_on` belongs at the top of a pipeline; `continues_on` is "parse
on the pool, then touch the UI on the UI thread". An unplaced completion
may arrive on a library's I/O thread, a pool worker, or the caller's
thread if it completed inline: fine for pure computation, fatal for
context-bound state. `starts_on` was called `on` until P3175, which
reused that name for an adaptor that hops to a scheduler and back.
