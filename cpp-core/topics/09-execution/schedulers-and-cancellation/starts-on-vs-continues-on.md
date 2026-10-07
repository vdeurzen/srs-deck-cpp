---
id: execution-starts-on-vs-continues-on
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
refs:
  - https://eel.is/c++draft/exec.starts.on
  - https://eel.is/c++draft/exec.continues.on
  - https://wg21.link/p3175
requires:
  - execution-schedule-sender
---

Two adaptors place work in time, and the difference is which end of the
sender they touch. `starts_on(sch, sndr)` transitions to `sch`
{{c1::before starting sndr::so sndr's own work begins on that
context}}, and is what you reach for at the top of a pipeline (it was
called `on` until P3175, which reused that name for an adaptor that hops
to a scheduler and back). `continues_on(sndr, sch)` instead transitions
{{c2::after sndr completes::so everything downstream of it runs on the
new context}}: "parse on the pool, then touch the UI on the UI thread".

Both are explicit because a completion otherwise arrives on
{{c3::whichever context the operation happened to finish on::a
library's I/O thread, a pool worker, or the caller's thread if it
completed inline}}, which is fine for pure computation and fatal for
context-bound state.
