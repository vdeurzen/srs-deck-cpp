---
id: ll-go-channels
kind: basic
version: 1
level: 4
tags: [go, concurrency, queues, low-latency]
elaborate: In a Go service you know, which channel is on the hot path, and does its other side usually keep up or usually park?
requires:
  - ll-go-blocking-basics
refs:
  - https://go.dev/src/runtime/chan.go
  - https://go.dev/doc/effective_go#channels
---

## A producer and a consumer both keep up with a buffered Go channel, so its buffer is never empty or full. What does each send cost?

---

**A mutex lock/unlock and one value copy — no scheduler work.**
`chansend` takes `hchan`'s lock, then hands the value to a parked receiver
or copies it into the ring. Only when the other side has actually parked
(empty buffer, or full) does a send pay a goroutine park/unpark: hundreds
of nanoseconds and often a cross-core wake-up (Go 1.27 `runtime/chan.go`).
