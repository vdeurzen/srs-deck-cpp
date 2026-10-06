---
id: trap-go-gc-and-leaks
kind: basic
version: 1
level: 4
tags: [transfer, misconception, go, memory]
elaborate: Where does a goroutine in your service block on a channel? Who guarantees that channel is eventually closed or the context cancelled?
refs:
  - https://go.dev/blog/slices-intro
  - https://pkg.go.dev/context
  - https://go.dev/doc/go1.23#timer-changes
---

## True or false: a garbage-collected language like Go cannot leak memory, so the ownership reasoning C++ forces on you is unnecessary.

---

**False on both halves.** The GC removes *use-after-free* and
*double-free*, which is a large win. It does not remove the question
"who is keeping this alive?" — it only changes the failure from a
crash into unbounded growth.

The four ways Go leaks, all of them reachability, not corruption:

- **Goroutine leaks.** A goroutine blocked forever on a channel send
  or receive is never collected, and it keeps everything it references
  alive with it. This is the most common Go leak by a wide margin, and
  the cure is structural: every goroutine needs a termination
  condition — a closed channel, a cancelled `context`, a `select` with
  `ctx.Done()`.
- **Substring and sub-slice retention.** `s[2:5]` shares the original
  backing array, so a 10-byte substring of a 10 MB response keeps all
  10 MB alive. Copy when you keep a small piece of something big.
- **Live containers.** A map used as a cache with no eviction is a
  leak with a nicer name; so is an append-only slice of finished
  requests. The GC cannot know you are done with an entry you can
  still reach.
- **Callbacks and subscriptions registered with a long-lived object**,
  which keep a reference from the other side. (Un-stopped timers and
  tickers used to be the classic case; since Go 1.23 unreferenced ones
  are collected even without `Stop`.)

So the discipline transfers, just under a different name: in C++ you
ask *who owns this*; in Go you ask *who still references this, and what
will drop the reference*. Both are reachability questions, and both are
answered at design time.

The other half of the trade is latency, not correctness: the GC
introduces pauses and write barriers, so a Go hot path avoids
allocation (`sync.Pool`, pre-allocated buffers, value receivers,
avoiding interface boxing) for the same reason a C++ hot path avoids
`new` — the tail, not the average.
