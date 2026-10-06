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
  - https://programming.guide/robin-hood-hashing.html
---

## State the Robin Hood invariant, and explain what it buys beyond plain linear probing.

---

Define a slot's **probe sequence length** (PSL) as the distance from the
key's home slot to where it actually sits. The invariant: **a key never
sits behind a key with a smaller PSL**. On insert, you carry a
(key, PSL) pair along the probe sequence, and whenever the occupant you
meet is *richer* — closer to its home than you are to yours — you swap:
the occupant is evicted and continues probing with your role.

The total displacement is unchanged; what changes is its **variance**.
Plain linear probing produces a few very unlucky keys with enormous probe
lengths; Robin Hood shares the misery, so the maximum PSL stays small
(O(log n) with high probability) even at high load factors. A structure
whose *worst* lookup is bounded is worth a great deal when the metric is
p99.9 rather than the mean.

It also makes lookups **early-exit**: while searching, if you reach a
slot whose PSL is smaller than your current distance, your key cannot be
in the table — it would have evicted that occupant when it was inserted.
A miss costs about as much as a hit, instead of walking to the end of the
run.

Deletion is where Robin Hood pays for itself twice: instead of a
tombstone, use **backward-shift deletion** — walk forward from the hole,
moving each following element back one slot until you reach an empty slot
or one with PSL 0. The invariant is restored, the table stays
tombstone-free, and a delete-heavy workload never degrades.

The costs: inserts do more writes (each swap is a store), the PSL must
be stored or recomputed, and the shifting makes it awkward to make
concurrent. Swiss tables took the other branch — accept the variance,
kill the cache misses with SIMD group probing — and generally win on
throughput, while Robin Hood's argument remains the tail.
