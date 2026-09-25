---
id: foundations-cache-cost-model
kind: cloze
version: 1
level: 3
tags: [memory-hierarchy, cost-model, low-latency]
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://ieeexplore.ieee.org/document/814600
---

On modern hardware the unit of cost that matters for a data structure is
rarely the instruction — it is the {{c1::cache miss::a trip to a slower
level of the hierarchy}}. Memory moves between levels in fixed blocks of
{{c2::64 bytes::one cache line on x86-64 and AArch64}}, so touching one
byte pays for all of them, and a structure that packs eight useful values
into that block does eight times the work per miss as one that packs one.

Two access patterns cost the same in big-O and differ by an order of
magnitude in practice: a sequential scan gets both spatial locality and
{{c3::hardware prefetching::the prefetcher recognises strided access and
fetches ahead}}, while pointer chasing serialises — the next address is
not known until the current load {{c4::returns::so the misses cannot
overlap, and latency adds up instead of being hidden}}.

The cache-oblivious model captures this without naming a block size: an
algorithm is analysed for an ideal two-level hierarchy with unknown `B`
and `M`, and if it is efficient for every `B` it is efficient at
{{c5::every level of the hierarchy at once::registers/L1, L1/L2, L2/L3,
RAM/disk}}. Van Emde Boas layouts and cache-oblivious merge sort are the
standard examples.
