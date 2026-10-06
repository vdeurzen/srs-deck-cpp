---
id: heap-timer-wheel
kind: basic
version: 1
level: 5
requires:
  - heap-vocabulary
tags: [queues, timers, low-latency, networking]
refs:
  - https://dl.acm.org/doi/10.1145/41457.37504
  - https://lwn.net/Articles/646950/
---

## A server holds a million pending timeouts, almost all of which get cancelled. Why is a heap the wrong structure, and what replaces it?

---

With a heap, each `schedule` and each `cancel` is O(log n) and cancel
additionally needs a handle into the heap. At a million timers and a
high churn rate that is both real CPU time and a memory-bound pointer
structure — for a workload where the *typical* timer is created,
cancelled, and never fires.

A **timing wheel** is a circular array of buckets, each holding an
intrusive list of timers, with a cursor advanced by the clock. Schedule
is "compute the bucket, link at the head" — O(1). Cancel is "unlink" —
O(1), with no search, because the timer node is embedded in the object
that owns it. Expiry is "walk the current bucket's list", paid only for
timers that actually fire.

The resolution/range trade-off is handled by **hierarchy**: several
wheels, each with a coarser tick (milliseconds, seconds, minutes, hours
— exactly like a mechanical clock). A timer is placed in the coarsest
wheel that can hold it, and when a coarse wheel's cursor advances, its
bucket's timers **cascade** down into the finer wheel. Insert and cancel
stay O(1); cascading is the amortised cost, paid once per level per
timer. This is Varghese and Lauck's design. Kafka's request purgatory
uses the hierarchical form, Netty's `HashedWheelTimer` a single hashed
wheel, and the Linux kernel a multi-level wheel that since 4.8 drops
cascading altogether, accepting coarser expiry for far-off timeouts
because almost none of them ever fire.

When the heap is still right: few timers, or when you need the *exact*
next expiry time to program a one-shot hardware timer or a poll
timeout — a wheel only knows "something in this bucket, some time in
this tick". Hybrids are common: a wheel for the mass of connection
timeouts, plus a small heap of precise deadlines.

The property that makes it the low-latency answer is the absence of
allocation and of ordering work: on the hot path a timer is a few
pointer stores to link in and two to unlink, no comparisons, no rebalancing, no cache misses
beyond the object you already have in hand.
