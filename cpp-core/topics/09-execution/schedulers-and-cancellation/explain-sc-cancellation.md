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
---
Explain where failure and cancellation go in a `std::execution`
program: how a stop request travels, how it is answered, and why an
error cannot get lost.
---
- [ ] A stop request flows down through the receiver's environment: operations ask `get_stop_token` and register a callback, with no global and no extra argument
- [ ] It is answered by a completion, not a kill: the operation still finishes exactly once, usually with `set_stopped`, and is waited for
- [ ] `when_all` turns one child's failure into a stop request to its siblings, then waits for them before reporting the error
- [ ] An error has a destination: it completes the parent on `set_error`, and at the edge `sync_wait` rethrows it in the caller
- [ ] Detached work cannot drop an error silently: `spawn` accepts only senders that complete with `set_value()` or `set_stopped()`, so failures must be handled before the call compiles
