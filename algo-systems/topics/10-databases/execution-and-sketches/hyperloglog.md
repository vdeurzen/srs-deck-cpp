---
id: db-hyperloglog
kind: basic
version: 1
level: 4
tags: [databases, sketches, probabilistic]
requires:
  - hash-quality-low-bits
refs:
  - http://algo.inria.fr/flajolet/Publications/FlFuGaMe07.pdf
elaborate: HyperLogLog combines its registers with a harmonic mean rather than an arithmetic one. Which kind of register would drag an arithmetic mean off?
---

## HyperLogLog records, per register, the longest run of leading zero bits among the hashes it saw. Why does that estimate a distinct count?

---

**A run of `k` zeros has probability 2⁻ᵏ, so seeing one suggests about 2ᵏ distinct hashes.**

A repeated value hashes identically, so duplicates change nothing. One
such maximum is wildly noisy, so HLL splits hashes over `m` registers by
their first bits and averages the registers' estimates.
