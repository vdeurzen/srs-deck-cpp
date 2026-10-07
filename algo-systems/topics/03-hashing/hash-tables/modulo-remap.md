---
id: hash-modulo-remap
kind: basic
version: 1
level: 3
tags: [hashing, distributed, databases]
requires:
  - hash-average-vs-worst
elaborate: Which of your systems shards by `hash % N`? What happens to its caches the day N changes?
refs:
  - https://dl.acm.org/doi/10.1145/258533.258660
---

## Keys are spread over 3 cache servers by `hash(key) % 3`. One server dies and you switch to `% 2`. What fraction of *all* keys change server?

---

**About two thirds, including most keys on the two servers that survived.**
A key stays only if `h % 3 == h % 2`; over `h mod 6` that holds for 0
and 1 alone. Nearly every cache misses at once, exactly when capacity
just dropped.
