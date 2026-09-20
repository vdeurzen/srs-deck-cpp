---
id: execution-starts-on-vs-continues-on
kind: cloze
version: 1
level: 4
tags: [execution, async, c++26, scheduling]
refs:
  - https://en.cppreference.com/w/cpp/execution
  - https://wg21.link/p2300
---

Two adaptors place work in time, and the difference is which end of the
sender they touch. `starts_on(sched, sndr)` transitions to `sched`
{{c1::before starting sndr::so the predecessor's work begins on that
context}}, and is what you reach for at the top of a pipeline.
`continues_on(sndr, sched)` instead transitions
{{c2::after sndr completes::so everything downstream of it runs on the
new context}} — the adaptor formerly proposed as `transfer`, and the
one that answers "do the parsing on the pool, then touch the UI on the
UI thread".

Neither changes what the work *is*, only where it happens, and both are
explicit for the same reason coroutines make you write
`co_await sched.schedule()`: a completion may otherwise arrive on
{{c3::whichever context the operation happened to finish on::a library's
I/O thread, a pool worker, or the caller's thread if it completed
inline}}, which is fine for pure computation and fatal for
context-bound state.

The lower-level `schedule_from(sched, sndr)` is what `continues_on` is
specified in terms of; a scheduler can customise it to make the hop
cheaper, and the ordinary code never mentions it.
