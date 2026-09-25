---
id: ll-progress-guarantees
kind: basic
version: 1
level: 4
tags: [low-latency, lock-free, concurrency, misconception]
elaborate: Think of a lock in code you own. Is the problem it causes throughput, or the tail when its holder is descheduled?
refs:
  - https://en.wikipedia.org/wiki/Non-blocking_algorithm
  - https://en.cppreference.com/w/cpp/atomic/atomic/is_lock_free
---

## True or false: lock-free data structures are faster than lock-based ones.

---

**False as stated** — "lock-free" is a *progress guarantee*, not a
performance claim. Define the ladder first:

- **Blocking**: a thread suspended while holding the lock stops
  everyone (and a thread *descheduled* while holding it does the same —
  the reason locks hurt tails more than averages).
- **Obstruction-free**: a thread makes progress if it runs alone for
  long enough.
- **Lock-free**: *some* thread always makes progress. Individual
  threads may starve, retrying their CAS forever, but the system as a
  whole advances.
- **Wait-free**: *every* thread completes in a bounded number of its
  own steps. The strongest, the rarest, and usually the slowest in the
  common case, because bounding the worst case costs work on every
  operation (helping schemes, announcement arrays).

On throughput, an uncontended `std::mutex` is a couple of atomic
operations and is frequently *faster* than a lock-free structure doing
several CAS retries under contention — and every failed CAS is a cache
line bounced between cores. What lock-freedom buys is the **tail** and
the **failure modes**: no priority inversion, no convoy, no
"the holder was preempted and now 40 threads are stuck", and usability
from contexts where blocking is forbidden (signal handlers,
interrupt-ish paths, a thread pinned to an isolated core with no
scheduler help).

So the decision is about requirements, not speed. Ask: does a stalled
participant have to stop the others? Must this run without syscalls?
Is the contention real, and measured?

Two footnotes worth carrying. `std::atomic<T>::is_lock_free()` is
per-type and per-platform — a lock-free algorithm built on an atomic
the platform implements with a hidden mutex is not lock-free at all,
which is why `is_always_lock_free` is the compile-time check to
`static_assert` on. And the simplest lock-free design is usually the
right one: single-writer structures (SPSC queues, seqlocks) need no
CAS at all, and avoid the whole ABA-and-reclamation edifice.
