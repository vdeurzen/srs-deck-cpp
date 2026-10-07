---
id: db-count-min-heavy-hitters
kind: basic
version: 1
level: 4
tags: [databases, sketches, streaming, heaps]
requires:
  - db-count-min-sketch
  - heap-top-k
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
---

## A count-min sketch cannot list the keys it has seen. How do you report the 10 most frequent keys of an unbounded stream?

---

**Keep a size-10 min-heap beside it; admit a key once its estimate beats the heap's minimum.**

A key already in the heap just has its count updated; a new one rarely
qualifies. Memory is the sketch plus ten entries, however long the
stream: the shape behind hot-key detection.
