---
id: foundations-cache-oblivious
kind: cloze
version: 1
level: 4
tags: [memory-hierarchy, cost-model]
requires:
  - foundations-external-memory-model
refs:
  - https://ieeexplore.ieee.org/document/814600
  - https://en.algorithmica.org/hpc/external-memory/oblivious/
---

The cache-oblivious model analyses an algorithm for an ideal two-level
cache (fully associative, optimal replacement, "tall": `M = Ω(B²)`) whose
block size `B` and fast-memory size `M` are {{c1::unknown to the
algorithm::what the code may assume about B and M}}. If
it is optimal for every `B` and `M`, it is optimal at {{c2::every level
of the hierarchy at once::L1/L2, L2/L3, RAM/disk}}, with no tuning
constant. Van Emde Boas tree layouts and funnelsort are the standard
examples.

---

Contrast a B-tree, which is *cache-aware*: its node size is chosen for
one `B` (a page), so it is optimal at that level and only that one.
