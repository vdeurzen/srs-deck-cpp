---
id: hash-perfect-hashing
kind: basic
version: 1
level: 4
requires:
  - hash-chaining-vs-open-addressing
tags: [hashing, compilers, static-sets]
refs:
  - https://www.gnu.org/software/gperf/manual/gperf.html
elaborate: Which lookup table in your code changes only when you ship a release?
---

## Your key set is fixed at build time — the 100 keywords of a language. What can you do that a general hash table cannot?

---

**Generate a perfect hash: no collisions, so a lookup is one hash, one read, one compare.**

Collision resolution moves from run time to build time. The compare
stays, because a non-keyword can map to any slot. `gperf` does this for
lexers: a few character positions and the length pick the slot, emitted as C.
