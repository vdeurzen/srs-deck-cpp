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
{{c2::64 bytes::one cache line on x86-64}}, so touching one byte pays for
all of them, and a structure that packs eight useful values into that
block does eight times the work per miss as one that packs one.

Two access patterns cost the same in big-O and differ by an order of
magnitude in practice: a sequential scan gets both spatial locality and
{{c3::hardware prefetching::the core recognises strided access and
fetches ahead}}, while pointer chasing pays a full miss for every node.
