---
id: hash-cuckoo-hashing
kind: basic
version: 1
level: 4
requires:
  - hash-load-factor-and-probes
tags: [hashing, worst-case, databases]
refs:
  - https://www.itu.dk/people/pagh/papers/cuckoo-jour.pdf
elaborate: Where in your systems does the p99.9 of a lookup matter more than its mean?
---

## Every key in a cuckoo table may live only at `h1(k)` or `h2(k)`. What does that guarantee for lookups that linear probing cannot?

---

**Worst-case O(1): at most two locations, for a hit or a miss.**

Probing's bound is expected; an unlucky run makes one lookup long.
Cuckoo never looks further than the two homes, so the tail equals the
mean: why it appears in packet forwarding and read-mostly indexes.
