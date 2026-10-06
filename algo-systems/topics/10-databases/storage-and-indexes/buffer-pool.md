---
id: db-buffer-pool
kind: basic
version: 1
level: 4
tags: [databases, caching, memory-hierarchy]
refs:
  - https://www.cs.cmu.edu/~christos/courses/721-resources/p297-o_neil.pdf
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#LRU-K
  - https://15445.courses.cs.cmu.edu/
---

## Why does a database implement its own page cache instead of relying on the OS page cache, and why is plain LRU the wrong policy?

---

Because the engine knows things the kernel cannot: which pages are
**pinned** by a running operator and must not be evicted, which are
**dirty** and constrained by the WAL's ordering rules, which will be
read once by a sequential scan and never again, and which are index
interior pages that every query touches. It also needs to control
eviction to guarantee **write-ahead**: a dirty page may only be written
after its log records have been flushed. `mmap` hands all of that to
the kernel, which is why "just use mmap" is a known trap for storage
engines — no control over eviction order, unpredictable stalls on
page faults, and no way to enforce WAL ordering.

Plain LRU fails on **sequential flooding**: one large scan touches
millions of pages once each, and LRU dutifully evicts the entire
working set for data that will never be read again. The fixes:

- **LRU-K** (usually LRU-2): order by the time of the *K-th* most
  recent access, so a page needs to be touched twice within a window to
  be considered hot. A one-shot scan never qualifies.
- **CLOCK / second chance**: a circular scan with a reference bit per
  frame — an approximation of LRU that costs one bit and no list
  manipulation per hit, which matters because a per-access list update
  is a contended write in a concurrent buffer pool.
- **Scan-resistant variants**: 2Q, ARC, and the simple expedient of
  giving sequential scans their own small ring of frames.

The structures underneath are worth naming: a hash table from page id
to frame, a pin count and dirty flag per frame, a latch per frame, and
a free list. The pin count is a mini reference-counting problem, and
the most common bug in a hand-written buffer pool is a leaked pin,
which silently shrinks the pool until nothing can be evicted.

The modern variation is **pointer swizzling**: store a direct pointer
to the frame in the parent page when the child is resident, so a hot
traversal skips the hash lookup entirely, and un-swizzle on eviction —
the technique that lets an in-memory-speed engine still handle
larger-than-memory data.
