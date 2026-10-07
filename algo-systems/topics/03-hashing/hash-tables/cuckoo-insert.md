---
id: hash-cuckoo-insert
kind: basic
version: 1
level: 4
requires:
  - hash-cuckoo-hashing
tags: [hashing, worst-case]
refs:
  - https://www.itu.dk/people/pagh/papers/cuckoo-jour.pdf
---

## A cuckoo insert finds `h1(k)` taken, evicts the occupant to its other home, which evicts another… What happens if the chain of evictions loops?

---

**After a bounded number of kicks it gives up and rehashes everything with new hash functions.**

So cuckoo is the mirror of probing: lookups are worst-case O(1), inserts
only expected O(1) with an unbounded worst case. Weak or correlated
`h1`/`h2` make this happen often: the failure is a failed insert, not a
slow one.
