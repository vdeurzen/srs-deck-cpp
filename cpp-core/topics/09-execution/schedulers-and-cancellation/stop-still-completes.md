---
id: execution-stop-still-completes
kind: basic
version: 1
level: 4
tags: [execution, async, c++26, concurrency, misconception]
elaborate: Where in your own code does "cancel" mean freeing or abandoning something that another thread, or the kernel, may still be writing to?
refs:
  - https://eel.is/c++draft/exec.async.ops
  - https://eel.is/c++draft/exec.set.stopped
requires:
  - execution-stopped-channel
---

## A stop is requested while an operation's kernel read is in flight. Can its operation state be destroyed now that the work is cancelled?

---

**No: the operation still completes, exactly once, and must be waited
for.**

A stop request is only a request. The operation tells the kernel to
cancel, waits for the read to finish, then completes with `set_stopped`
(or with its value, if the read won the race). Cancellation is neither
an unwind nor a kill.
