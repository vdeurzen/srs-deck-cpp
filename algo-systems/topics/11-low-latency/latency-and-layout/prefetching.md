---
id: ll-prefetching
kind: basic
version: 1
level: 5
tags: [low-latency, memory-hierarchy, optimisation]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/prefetching/
  - https://www.agner.org/optimize/
---

## What does the hardware prefetcher already do for you, and what does a software prefetch add?

---

The hardware handles **regular** patterns: sequential and constant-stride
access within a page, several streams at once, detected after a few
accesses. So a loop over an array, a linear scan of a column, or a
memcpy needs no help — and code written to *be* sequential gets this
for free, which is most of the argument for flat layouts.

What it cannot do is follow a **data-dependent** address: the next
node's pointer is not known until the current load returns. That is
pointer chasing, and it serialises misses — each ~80 ns, one after
another, with the core idle in between.

A software prefetch (`__builtin_prefetch`, `_mm_prefetch`) starts the
load early without consuming a register or stalling. It pays only when
you can compute the address **far enough in advance** — roughly 100+
cycles, or a couple of loop iterations — and when the loop is not
already bandwidth-bound. The patterns where it wins:

- **Indexed gathers**: `for (i) sum += table[idx[i]]` — prefetch
  `table[idx[i + 8]]` while working on `i`. The `idx` array is
  sequential, so the addresses *are* known ahead.
- **Hash table probes and B-tree descents in batches**: process 8
  lookups at once, issuing all their first-level prefetches, then all
  their second-level ones. This turns 8 serialised miss chains into 8
  overlapping ones — often a 3–4× speedup, and it is why modern
  engines batch their index lookups.
- **Eytzinger binary search**: prefetch the block of descendants
  several levels down (`b + k * 16` for 4-byte keys). Because the
  descendants of `k` at each level are contiguous, one 64-byte line
  holds all 16 of them four levels down, so the prefetch is issued four
  iterations before the load that needs it — prefetching just the two
  children would have no lead time at all.
- **Linked structures you control**: store a "next next" hint, or
  prefetch the node after next during traversal.

The failure modes are worth as much as the technique: prefetch too
early and the line is evicted before use; too late and you gained
nothing; too much and you evict useful data and waste bandwidth
(prefetching is not free — it occupies fill buffers and memory
bandwidth). Always measure, and prefer restructuring the data so the
hardware prefetcher can do the job over teaching the software to do it
by hand.
