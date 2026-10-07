---
id: ll-seqlock-vs-rcu
kind: basic
version: 1
level: 5
tags: [low-latency, concurrency, seqlock, linux]
requires:
  - ll-seqlock
  - ll-rcu-grace-period
refs:
  - https://www.kernel.org/doc/html/latest/locking/seqlock.html
  - https://www.kernel.org/doc/html/latest/RCU/whatisRCU.html
---

## Seqlock readers sometimes retry; RCU readers never do. What difference in how the writer updates decides that?

---

**A seqlock writer overwrites the data in place; an RCU writer publishes
a new copy.** In-place readers can see a half-written copy and must
retry. RCU readers see the old or new version whole, so the old one is
freed after a grace period. Seqlock suits small values; RCU suits
pointer-linked data that can be swapped.
