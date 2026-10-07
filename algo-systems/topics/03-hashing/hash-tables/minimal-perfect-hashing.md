---
id: hash-minimal-perfect
kind: basic
version: 1
level: 4
requires:
  - hash-perfect-hashing
tags: [hashing, static-sets, databases]
refs:
  - https://cmph.sourceforge.net/papers/esa09.pdf
  - https://arxiv.org/abs/2104.10402
---

## A search engine ships a 50-million-term dictionary as a build artefact. What does a *minimal* perfect hash give it over an ordinary perfect hash?

---

**Its `n` keys map onto exactly `0 … n−1`: no empty slots at all.**

The values can then sit in a dense array indexed by the hash. Modern
constructions (CHD, PTHash) need only about 2–3 bits per key for the
function and build in linear time; any change to the key set means
rebuilding it.
