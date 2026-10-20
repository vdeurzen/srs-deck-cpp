---
id: foundations-cache-cost-model
kind: cloze
version: 1
level: 3
tags: [memory-hierarchy, cost-model, low-latency]
requires:
  - foundations-latency-scale
elaborate: Where in code you have written does a loop chase pointers, and how would you lay the data out to scan it instead?
refs:
  - https://en.algorithmica.org/hpc/cpu-cache/
  - https://ieeexplore.ieee.org/document/814600
---

On modern hardware the unit of cost that matters for a data structure is
rarely the instruction — it is the {{c1::cache miss::a hardware event}}. Memory moves between levels in
fixed blocks (cache lines), so touching one byte pays for the whole line, and a structure that packs eight useful values into that
block does eight times the work per line loaded as one that packs one.

Two access patterns can make the same number of reads and differ by an
order of magnitude in practice: a sequential scan uses every byte of each line it loads and gets
{{c2::hardware prefetching::a hardware feature of the core}}, while pointer
chasing (reading each node's address out of the previous node) pays a full
miss for every node.
