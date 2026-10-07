---
id: execution-explain-model
kind: explain
version: 2
level: 5
tags: [execution, async, c++26]
refs:
  - https://eel.is/c++draft/exec
  - https://wg21.link/p2300
requires:
  - execution-explain-sender-protocol
  - execution-explain-context-and-contract
  - execution-sync-wait-blocks-a-worker
---
A colleague replaces `async(load).then(parse).then(show)` (a
futures library with `.then`) with `schedule(pool) | then(load) | then(parse) |
continues_on(ui) | then(show)` and runs it with `sync_wait`. Walk
through what changes, as cause and consequence.
---
- [ ] Building the pipeline runs nothing, so the caller still picks the pool and the UI context; the future chain had already started `load` on a thread of its own choosing
- [ ] `sync_wait` connects the chain into one operation state on its own stack and blocks until it completes, so no link needs a shared state and the lambdas may borrow the caller's locals
- [ ] `show` runs on the UI thread only because `continues_on(ui)` says so; without it, it would run on the pool worker that finished `parse`
- [ ] If `parse` throws, `then` catches it and completes on `set_error`, `show` never runs, and `sync_wait` rethrows the exception in the caller
- [ ] `sync_wait` parks the thread that calls it, so this must run from `main` or a thread that owns the request, never from a `pool` worker: on a one-thread pool, `load` would wait forever for the worker that is waiting for it
