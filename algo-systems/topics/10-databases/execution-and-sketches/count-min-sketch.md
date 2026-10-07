---
id: db-count-min-sketch
kind: basic
version: 1
level: 4
tags: [databases, sketches, probabilistic, streaming]
requires:
  - db-bloom-filter
refs:
  - http://dimacs.rutgers.edu/~graham/pubs/papers/cm-full.pdf
elaborate: Two shards kept count-min sketches with the same width, depth and hash functions. How do you get the sketch of both streams together?
---

## A count-min sketch adds each key to one counter in each of its `d` rows. How does a query turn those `d` counters into an estimate?

---

**It takes the minimum: collisions only ever add, so the smallest counter is tightest.**

Every counter holding the key also holds whatever else hashed there, so
each row overestimates. The estimate is never below the truth, and an
estimate of 0 is certain.
