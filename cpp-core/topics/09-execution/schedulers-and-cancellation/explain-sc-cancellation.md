---
id: execution-explain-sc-cancellation
kind: explain
version: 1
level: 5
tags: [execution, async, c++26, concurrency]
refs:
  - https://eel.is/c++draft/exec.get.stop.token
  - https://eel.is/c++draft/exec.when.all
  - https://eel.is/c++draft/exec.spawn
requires:
  - execution-stop-still-completes
  - execution-when-all
  - execution-spawn-vs-spawn-future
  - execution-sync-wait
---
A colleague asks how a `std::execution` program makes sure that neither
a cancellation nor a failure is silently lost. Explain it to them.
---
- [ ] A stop request travels down through each receiver's environment, as a stop token the operation asks for
- [ ] A stopped operation still completes exactly once, usually with `set_stopped`, and is waited for
- [ ] `when_all` turns one child's failure into a stop request to its siblings, then waits for them
- [ ] An error completes the parent on `set_error`, and at the edge `sync_wait` rethrows it in the caller
- [ ] `spawn` accepts only senders completing with `set_value()` or `set_stopped()`, so detached work must handle errors first
