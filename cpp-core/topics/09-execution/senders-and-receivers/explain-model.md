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
  - execution-no-allocation-per-link
  - execution-sync-wait-blocks-a-worker
---
A colleague replaces `async(load).then(parse).then(show)` (a
futures library with `.then`) with `schedule(pool) | then(load) | then(parse) |
continues_on(ui) | then(show)` and runs it with `sync_wait`. Walk them
through what changes, as cause and consequence.
---
- [ ] Building the pipeline runs nothing, whereas the future chain had already started `load` on a thread it chose
- [ ] `sync_wait` nests every link in one operation state on its own stack, so no link allocates a shared state
- [ ] `show` runs on the UI thread only because `continues_on(ui)` moves it there; otherwise it runs on the pool
- [ ] If `parse` throws, `then` completes on `set_error`, `show` never runs, and `sync_wait` rethrows in the caller
- [ ] `sync_wait` blocks its caller, so it belongs in `main`, never on a `pool` worker, where it can deadlock
