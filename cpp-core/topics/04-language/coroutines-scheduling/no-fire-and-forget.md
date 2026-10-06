---
id: coroutines-scheduling-no-fire-and-forget
kind: basic
version: 1
level: 5
tags: [coroutines, scheduling, lifetimes]
requires:
  - coroutines-scheduling-structured-concurrency
refs:
  - https://wg21.link/p3149
  - https://wg21.link/p2300
---

## Structured concurrency rules out detached tasks. What replaces `fire_and_forget(work())` in such a runtime?

---

**Spawning into a scope that someone awaits.** An async-scope object
(the sender/receiver `counting_scope`, P3149, C++26) collects spawned
work and is joined before it dies, so "forget" becomes "the owner waits
at the end". The only genuinely detached things — the I/O thread and
the top-level `sync_wait` — are owned by `main`, on the stack, and
passed down as references.
