---
id: hash-perfect-hashing
kind: basic
version: 2
level: 4
requires:
  - interview-essentials/hash-chaining-vs-open-addressing
tags: [hashing, compilers, static-sets]
refs:
  - https://www.gnu.org/software/gperf/manual/gperf.html
elaborate: Which lookup table in your code changes only when you ship a release?
---

## A lexer's 100 keywords are fixed at build time, so a generator gives them a *perfect* hash: no two keywords share a slot. Why does each lookup still compare the identifier with the keyword in its slot?

---

**A non-keyword can hash to any slot; only the compare rejects it.**

"Perfect" covers only the keys it was built from. Collision resolution
moved from run time to build time, so a lookup is one hash, one read,
one compare. `gperf` does this for lexers: a few character positions and
the length pick the slot, emitted as C.
