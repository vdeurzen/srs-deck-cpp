---
id: trap-random-access-is-free
kind: basic
version: 1
level: 3
tags: [transfer, misconception, memory-hierarchy]
elaborate: Which loop in your hot path has a data-dependent address? Could the data be reordered so the access becomes sequential?
requires:
  - foundations-cache-cost-model
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://en.wikipedia.org/wiki/Random-access_machine
---

## True or false: memory is random access, so `a[i]` costs the same whichever `i` you pick.

---

**False, by up to two orders of magnitude.** The RAM model that every
complexity analysis assumes — uniform O(1) access to any address — has
not described real hardware since the 1980s.

What actually happens on `a[i]`:

- The address must be **translated** (TLB hit, or a page walk of up to
  four dependent memory accesses).
- The line must be **fetched** — L1 ~1 ns, L2 ~4 ns, L3 ~15 ns, DRAM
  ~80 ns — and the whole 64-byte line is transferred whatever you
  asked for.
- If the access is part of a **predictable pattern**, the prefetcher
  has already started, and the cost can be nearly zero. If the address
  depends on a value that is itself being loaded, nothing can be
  prefetched and the misses **serialise**.

So the same instruction spans ~1 ns to ~200 ns depending on locality,
and the difference between a sequential scan and a random gather over
the same array is routinely 10–50×. That single fact explains most of
this Deck: why B-trees beat red-black trees, why open addressing beats
chaining, why CSR beats a vector of vectors, why columnar beats row
storage for scans, and why arenas beat individual allocations.

The corrected model to reason with: **count cache misses, not
operations**, and treat "will the next address be predictable?" as a
first-class design question. Three practical moves follow — make
access sequential (sort by access order, use flat layouts), make the
working set smaller (compress, use 32-bit handles instead of
pointers), and overlap the misses you cannot avoid (batch the lookups
and prefetch, so several are in flight at once).

The external-memory version of the same lesson is one level up: on
disk the ratio is not 50× but 100 000×, which is why databases go to
such lengths to turn random I/O into sequential I/O.
