---
id: hash-robin-hood
kind: basic
version: 1
level: 4
requires:
  - hash-primary-clustering
tags: [hashing, open-addressing]
refs:
  - https://cs.uwaterloo.ca/research/tr/1986/CS-86-14.pdf
---

## In Robin Hood hashing, a key's *probe sequence length* (PSL) is its distance from its home slot. What invariant does insertion keep between neighbouring keys' PSLs?

---

**Along a run, PSL rises by at most 1 per slot: keys stay sorted by home slot.**

On insert you carry `(key, PSL)` along the run; meeting an occupant with
a smaller PSL than yours (closer to home), you take its slot and carry it
onwards. Total displacement is unchanged; it is only shared out.
