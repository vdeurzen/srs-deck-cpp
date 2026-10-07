---
id: sort-external-merge
kind: basic
version: 2
level: 4
tags: [sorting, databases, external-memory]
requires:
  - foundations-external-memory-model
elaborate: LSM compaction is a k-way merge of sorted SSTables — which part of this sort does it skip, and why?
refs:
  - https://dl.acm.org/doi/10.1145/48529.48535
  - https://dl.acm.org/doi/10.1145/1132960.1132964
---

## Sort 1 TB with 8 GB of RAM and 8 MB I/O buffers, by external merge sort. How many passes over the data?

---

**Two: one writes 128 sorted 8 GB runs, one merges all 128 at once.**

A merge pass can combine about memory ÷ buffer ≈ 1000 runs, more than
128, so one merge suffices: two reads and two writes of everything.
That is the I/O-model bound `Θ((N/B)·log_(M/B)(N/B))` at real sizes.
