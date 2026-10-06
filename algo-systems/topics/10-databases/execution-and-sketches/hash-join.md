---
id: db-hash-join
kind: basic
version: 1
level: 4
tags: [databases, joins, memory-hierarchy]
requires:
  - hash-chaining-vs-open-addressing
  - foundations-cache-cost-model
refs:
  - https://www.vldb.org/pvldb/vol7/p85-balkesen.pdf
  - https://15445.courses.cs.cmu.edu/
---

## Describe build and probe, then explain what grace and radix partitioning add.

---

**Build**: scan the smaller input, hash the join key, insert into a
hash table. **Probe**: scan the larger input, hash each key, look it
up, emit matches. One pass over each side, O(|R| + |S|) — the reason
hash join dominates equi-joins.

The trouble is the hash table's **random access**. If it does not fit
in cache, every probe is a cache miss plus a TLB miss; if it does not
fit in memory, every probe is a page fault, and the join collapses.

**Grace hash join** handles the memory case: partition *both* inputs by
the same hash into `k` partitions written to disk, chosen so each
partition's build side fits in memory, then join the partitions
pairwise. Sequential writes and reads instead of random ones — the
external-memory transformation again.

**Radix partitioning** applies the identical idea one level down, for
*cache*: partition by a few bits of the hash so that each partition's
hash table fits in L2, and do it in **multiple passes** so that no
single pass writes to more partitions than there are TLB entries and
write-combining buffers (the "fan-out limit", typically ~64–512 per
pass). The partitioning cost is a histogram pass plus a scatter pass,
and it is repaid many times over in probe misses avoided. Done well,
this is a several-fold difference in rows per second per core once the
table outgrows the cache.

Two more things a production implementation needs:

- **Skew handling.** One heavy key can make one partition enormous;
  detection plus a separate broadcast/nested-loop path for heavy hitters
  is standard (and a count-min sketch is one way to find them).
- **A semi-join filter.** Build a Bloom filter on the build keys and
  apply it to the probe side early — often *before* the scan, pushed
  into the storage layer ("sideways information passing"), so most
  probe rows are never read at all.

The alternative, sort-merge join, wins when an input is already sorted
or the output must be — which is a plan-level question, not a local
one.
