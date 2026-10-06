---
id: ll-seqlock
kind: basic
version: 1
level: 5
tags: [low-latency, concurrency, market-data]
requires:
  - ll-memory-orders
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
  - https://dl.acm.org/doi/10.1145/2247684.2247688
  - https://en.wikipedia.org/wiki/Seqlock
---

## One writer publishes a market-data snapshot thousands of times a second; many readers want the latest consistent copy. Why a seqlock?

---

Because readers must not slow the writer down, and a snapshot is
**replaceable** — a reader that misses one update simply reads the
next.

A seqlock is a counter plus the data. The writer increments the counter
to an **odd** value (signalling "update in progress"), writes the data,
then increments it again to an **even** value. A reader loads the
counter, reads the data, loads the counter again, and **retries** if
either read saw an odd value or the two loads differ. No reader ever
blocks the writer, there is no shared mutable state for readers to
contend on (they only read), and the writer's cost is two stores plus
the fences.

Properties to state precisely:

- **Writers block writers** (one writer, or an ordinary mutex among
  them) — this is not a general-purpose lock.
- **Readers are non-blocking but unbounded** — a reader never waits on
  a lock, but it is not wait-free, lock-free or obstruction-free; a
  fast enough writer can starve a reader into retrying forever. In
  practice the data is small and the window tiny.
- **Readers must tolerate reading torn data** before discovering the
  retry. Strictly, that is a data race in C++ unless the payload is
  read with relaxed atomics (or `memcpy` of trivially copyable data,
  which most implementations do and sanitisers complain about).
  `std::atomic_ref` over the payload is the standards-clean route.
- The ordering has four parts. The writer stores the odd counter
  **relaxed**, then issues a **release fence** (the kernel's
  `smp_wmb()`), then writes the payload, then stores the even counter
  with **release**. The reader loads the counter with **acquire**,
  reads the payload, issues an **acquire fence**, then re-loads the
  counter **relaxed**. Without the writer's fence a payload store can
  move above the odd store, and a reader sees an even, unchanged
  counter around torn data; without the reader's fence the payload
  loads can sink below the check.

Where it fits: the Linux kernel uses it for `jiffies` and timekeeping;
trading systems use it for order book snapshots and for
configuration that is read on every event and updated rarely; game
engines use it for transform state. The rule of thumb is **small,
frequently read, occasionally written, and replaceable** — if readers
need *every* version, you need a queue, not a seqlock.
