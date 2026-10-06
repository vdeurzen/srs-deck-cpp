---
id: ll-go-close-by-sender
kind: basic
version: 1
level: 2
tags: [go, concurrency, channels]
requires:
  - ll-go-blocking-basics
refs:
  - https://go.dev/ref/spec#Close
  - https://go.dev/doc/effective_go#channels
---

## A consumer calls `close(jobs)` to tell the producers to stop. What happens at a producer's next `jobs <- j`?

---

**It panics: `send on closed channel`.** Closing says "no more values",
so only the sending side may close, and only once every sender is done.

To stop producers from the receiving side, close a separate `done`
channel (or cancel a `context`) that the producers `select` on.
