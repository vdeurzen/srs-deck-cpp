---
id: ll-go-channels
kind: basic
version: 1
level: 4
tags: [go, concurrency, queues, low-latency]
elaborate: In a Go service you know, which channel is on the hot path — and is it carrying one item per send, or could it carry a batch?
refs:
  - https://go.dev/ref/mem
  - https://go.dev/doc/effective_go#channels
  - https://go.dev/src/runtime/chan.go
---

## What does a Go channel actually cost per send, and when should a hot path use something else?

---

A buffered channel is a ring buffer (`hchan`) plus **a mutex**, plus
two wait queues of blocked goroutines. A send takes the lock, and then
either hands the value directly to a waiting receiver (the fast path —
one copy straight into the receiver's stack, then mark it runnable),
copies into the buffer, or parks the sender. So the cost per operation
is a lock/unlock pair, a value copy, and — only when the other side
had actually parked (a receiver already waiting, or a sender blocked
on a full buffer) — a **goroutine park/unpark**, which is a scheduler
operation costing hundreds of nanoseconds and often a cross-core
wakeup. A producer and consumer that both keep up cross between
empty and non-empty constantly with no scheduler work at all.

That is a fine price for coordination and a poor one for a data path
carrying millions of items a second. What to do instead, in order of
how much you have to give up:

- **Batch.** Send `[]Item` instead of `Item`. One lock, one wakeup, N
  items. This is almost always the right first move and it keeps the
  channel's semantics.
- **Size the buffer for burst absorption**, not for throughput: an
  unbuffered channel forces a rendezvous (two scheduler operations) per
  item, while a buffer lets the sender run ahead. Note that an
  unbounded queue is *not* the goal — the buffer is your back-pressure.
- **Use a lock-free ring** for the hot link and keep channels for
  control. A single-producer/single-consumer ring between two pinned
  goroutines, with the consumer spinning briefly before falling back to
  a channel receive, removes the scheduler from the steady state.
- **`sync.Pool`** for the objects that flow through it, so the GC does
  not become the bottleneck the channel was not.

Two Go-specific facts worth holding. A channel send/receive pair is a
**happens-before edge** in the memory model, so it publishes everything
the sender wrote — the same role a release store plays in the C++
version, which is why channels are safe to pass pointers through.
And `select` with multiple ready cases chooses **uniformly at random**,
which is deliberate (it prevents starvation) and means a "priority"
select needs an explicit nested `select` with a `default`.
