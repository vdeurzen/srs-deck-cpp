---
id: ll-spsc-ring
kind: basic
version: 1
level: 5
tags: [low-latency, lock-free, queues, concurrency]
refs:
  - https://lmax-exchange.github.io/disruptor/disruptor.html
  - https://en.cppreference.com/w/cpp/atomic/memory_order
---

## Design a single-producer/single-consumer queue with no CAS. Which atomics are needed, and what exactly does each one order?

---

A fixed power-of-two array plus two counters: `head` (next slot to
read, written only by the consumer) and `tail` (next slot to write,
written only by the producer). **Each counter has exactly one writer**,
which is why no read-modify-write instruction is needed anywhere.

Producer:

1. Load `tail` **relaxed** — it owns it, nobody else writes it.
2. Load `head` **acquire** — to see how much space the consumer has
   freed, and to ensure the consumer's reads of a slot happen-before
   this overwrite.
3. If full, fail or spin. Otherwise write the element into
   `slot[tail & mask]` as a plain, non-atomic store.
4. Store `tail + 1` **release**. This is the publication: everything
   written before it becomes visible to any consumer that
   acquire-loads `tail`.

The consumer is the mirror image: relaxed `head`, acquire `tail`, read
the slot, release-store `head + 1`.

So there are exactly **two release/acquire pairs**, one per direction,
and each carries the data written just before it. Relaxed is correct
for a counter you alone write, because your own program order already
orders your accesses to it.

The performance work is all about cache lines, not atomics:

- **Pad `head` and `tail` onto separate lines.** Otherwise the
  producer's store to `tail` invalidates the line the consumer is
  reading `head` from on every operation — the false sharing that
  dominates a naive implementation's cost.
- **Cache the other side's counter.** The producer keeps a private
  `cached_head` and only re-reads the real one when it appears full;
  that turns the shared-line read from once per item into once per
  batch.
- **Batch.** Publishing one `tail` store for `n` items amortises the
  only expensive instruction in the loop.

Extending beyond one producer needs a CAS on `tail` (MPSC), or the
Disruptor's approach: claim a slot range with a fetch-add, write, then
publish a per-slot sequence number so consumers can tell which slots
are complete without a shared "committed" counter.
