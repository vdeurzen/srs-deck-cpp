---
id: ll-go-channel-batching
kind: basic
version: 1
level: 4
tags: [go, concurrency, queues, low-latency]
requires:
  - ll-go-channels
refs:
  - https://go.dev/doc/effective_go#channels
  - https://go.dev/src/runtime/chan.go
---

## A Go pipeline stage moves 5 million small `Item`s a second through a `chan Item`, and the profile shows `runtime.chansend` and lock contention. What is the first change to make?

---

**Send `[]Item` batches instead of single items.** One lock, one copy
of a slice header and at most one wake-up then cover N items, and the
channel keeps its semantics and its back-pressure. Replacing the channel
with a lock-free ring is the later, costlier step.
