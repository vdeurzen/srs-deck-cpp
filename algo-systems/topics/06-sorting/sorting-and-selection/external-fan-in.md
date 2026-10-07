---
id: sort-external-fan-in
kind: basic
version: 1
level: 4
tags: [sorting, databases, external-memory]
requires:
  - sort-external-merge
elaborate: On an SSD the penalty for small reads shrinks — which way does that move the best buffer size?
refs:
  - https://dl.acm.org/doi/10.1145/1132960.1132964
---

## External merge, 8 GB of memory, 128 runs. Raising each run's buffer from 8 MB to 64 MB makes reads more sequential. What can it cost?

---

**The fan-in drops to 127, so 128 runs need a second merge pass.**

Fan-in is memory ÷ buffer − 1 (one buffer is the output). An extra pass
rereads and rewrites everything, so engines compute the largest buffer
that still merges in one pass rather than hard-coding a size.
