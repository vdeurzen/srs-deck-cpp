---
id: execution-sync-wait-blocks-a-worker
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.sync.wait
requires:
  - execution-sync-wait
---

## A `then` callback running on a thread-pool worker calls `sync_wait` on more work for the same pool. What can go wrong?

---

**Deadlock: the worker is parked waiting for work that needs a free
worker.**

`sync_wait` blocks the calling thread, which is why it lives in
`std::this_thread`. It belongs at the edges, in `main`, a test, or a
thread that owns a request; inside a chain, compose with `let_value`
instead.
