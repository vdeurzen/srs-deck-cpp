---
id: execution-coroutine-or-sender
kind: basic
version: 1
level: 5
tags: [execution, async, c++26, coroutines]
refs:
  - https://eel.is/c++draft/exec.task
  - https://wg21.link/p2300
requires:
  - execution-senders-and-coroutines
---

## A request handler has a retry loop, a branch on the reply, and locals used across three awaits. Coroutine or sender chain?

---

**A coroutine: loops, branches and locals spanning suspensions read
sequentially there.**

A sender chain wins where every allocation counts (its storage is one
statically-sized operation state; a coroutine frame is only sometimes
elided) and as plumbing: starting, joining and cancelling the
coroutines with `when_all`, `starts_on` and scopes.
