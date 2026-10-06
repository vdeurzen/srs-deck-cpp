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
  - https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf
---

## What does cuckoo hashing guarantee that probing does not, and what does it give up to get it?

---

Every key has exactly **two** possible homes, `h1(k)` and `h2(k)` (or a
handful of candidate slots inside two buckets). So a lookup examines at
most two locations, always, and a failed lookup costs the same as a
successful one. That is a **worst-case O(1)** lookup, not an expected
one — the property probing cannot offer, and the reason cuckoo appears
in hardware tables, packet-forwarding lookups and read-dominated
in-memory indexes where the tail matters more than the mean.

Insertion is where the bill arrives. Place the key in `h1(k)`; if that
slot is taken, evict the occupant and re-place *it* in its alternate
home, and so on. The chain of evictions is usually short, but it can
cycle, and the implementation gives up after a bounded number of kicks
and rehashes the whole table with new hash functions. So inserts are
expected O(1) with a worst case that is unbounded — the mirror image of
probing.

Two other constraints:

- **Load factor.** Two tables with one slot each saturate around 50 %;
  raising the bucket size to 4 or 8 slots (or using three hash
  functions) pushes the practical limit above 90 %. Real
  implementations always use buckets, not single slots.
- **Hash independence.** The guarantee assumes `h1` and `h2` behave
  independently. Derived from the same weak hash, the failure mode is
  not slowness but insertion failure.

The idea is more widely deployed as the **cuckoo filter**: store a short
fingerprint of each key rather than the key, and make the second bucket
`i ⊕ hash(fingerprint)` so it can be computed from the fingerprint alone,
with no access to the original key. That gives a Bloom-filter-like
structure that supports deletion, has better locality (two bucket probes
rather than `k` scattered bits) and is smaller than Bloom at false
positive rates below ~3 %.
