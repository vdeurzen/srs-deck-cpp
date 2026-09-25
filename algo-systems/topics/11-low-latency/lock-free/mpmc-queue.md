---
id: ll-mpmc-queue
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, queues, concurrency]
refs:
  - https://www.cs.rochester.edu/~scott/papers/1996_PODC_queues.pdf
  - https://www.1024cores.net/home/lock-free-algorithms/queues/bounded-mpmc-queue
---

## Going from SPSC to many producers and consumers: what breaks, and how does a bounded MPMC queue fix it without a lock?

---

What breaks is that `tail` now has several writers, so "read it, write
my element, bump it" is no longer safe: two producers can claim the
same slot, and a producer that has claimed a slot but not yet written
it leaves a **hole** — a consumer following `tail` would read garbage.
The single-writer argument that made SPSC free is gone.

**The unbounded answer** is the Michael–Scott queue: a linked list with
CAS on `tail` to append and on `head` to pop, plus the **helping**
rule — a thread that finds `tail` lagging behind the real last node
advances it before retrying, so a producer descheduled between its two
CASes cannot block anyone. That is what makes it lock-free rather than
merely non-blocking-ish, and it is the algorithm behind
`ConcurrentLinkedQueue` and most textbook implementations. Its costs
are per-node allocation and the reclamation problem.

**The bounded answer** (Vyukov's MPMC ring) is what low-latency code
actually uses: a fixed array where **each slot carries its own
sequence number**.

- A producer fetch-adds (or CASes) a ticket from `tail`, computes its
  slot, and **waits until that slot's sequence equals the ticket** —
  meaning the previous generation has been consumed.
- It writes the element, then **release-stores** `ticket + 1` into the
  slot's sequence. That per-slot store is the publication.
- A consumer does the mirror image, leaving `ticket + capacity` behind.

The hole problem disappears because progress is decided per slot, not
by a global "committed" counter: a consumer waiting on slot 7 is
blocked only by the producer of slot 7, not by any other. No
allocation, no reclamation, one atomic RMW plus one store per
operation, and the array is cache-friendly.

Two practical notes. **Bounded is a feature** — an unbounded queue
turns a downstream slowdown into an out-of-memory kill, whereas a
bounded one gives back-pressure, which is what you want in a pipeline.
And the closer you can get to one writer per variable, the better: the
Disruptor's design (one claim sequence, per-slot publication, consumers
tracking their own cursor) exists precisely to minimise how many cores
write the same line.
