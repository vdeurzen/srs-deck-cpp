---
id: hash-primary-clustering
kind: basic
version: 1
level: 3
tags: [hashing, open-addressing]
refs:
  - https://en.wikipedia.org/wiki/Primary_clustering
  - https://en.wikipedia.org/wiki/Quadratic_probing
---

## What is primary clustering, and what do quadratic and double hashing change about it?

---

With linear probing, a collision walks to the next slot — so occupied
slots merge into **runs**, and a run is a magnet: a key hashing anywhere
inside a run of length `k` must walk to its end, and lands there,
extending it. Long runs get longer faster than short ones, so the
variance of probe lengths grows much faster than the mean. That is
primary clustering: the cost is driven by the *distribution* of
occupancy, not just the amount of it.

**Quadratic probing** visits `h, h+1, h+3, h+6, …` (offsets of
`i(i+1)/2`), so two keys that collide diverge immediately and runs do not
merge. It removes primary clustering but keeps **secondary** clustering:
keys with the *same* home slot still follow the same probe sequence.
With a power-of-two table and triangular offsets it is guaranteed to
visit every slot.

**Double hashing** makes the step itself depend on the key,
`h1(k) + i·h2(k)` with `h2` never zero and coprime to the table size.
That removes secondary clustering too and is the closest practical thing
to the uniform hashing the textbook analysis assumes — at the cost of a
second hash computation and, fatally for modern hardware, a probe
sequence that jumps all over memory. Every probe is a new cache line.

Which is why the modern answer is neither: keep linear probing *within* a
group of slots that shares one or two cache lines, and probe
quadratically *between* groups. Swiss tables and F14 both do this, so
clustering inside a group costs almost nothing (the line is already
loaded, and a SIMD compare tests 16 slots at once) while clusters cannot
merge across groups.
