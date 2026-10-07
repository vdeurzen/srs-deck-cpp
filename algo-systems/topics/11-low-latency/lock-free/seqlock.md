---
id: ll-seqlock
kind: basic
version: 1
level: 5
tags: [low-latency, concurrency, market-data]
requires:
  - ll-memory-orders
elaborate: Which state in your system is read on every event but written rarely — and could readers live with retrying?
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
  - https://dl.acm.org/doi/10.1145/2247684.2247688
---

## One writer publishes a small market-data snapshot thousands of times a second; many readers want the latest consistent copy. Why a seqlock rather than a reader-writer lock?

---

**Seqlock readers never write shared memory, so they cannot slow the
writer.** A reader-writer lock makes every reader write the lock word,
bouncing its line across cores. The writer makes a counter odd, writes,
makes it even; readers copy and retry if it was odd or changed. That
works because a snapshot is replaceable.
