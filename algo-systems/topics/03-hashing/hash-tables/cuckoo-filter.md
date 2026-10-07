---
id: hash-cuckoo-filter
kind: basic
version: 1
level: 5
requires:
  - hash-cuckoo-buckets
tags: [hashing, sketches, databases]
refs:
  - https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf
elaborate: Your Bloom filter can't forget a deleted key. When would that be worth swapping it for a cuckoo filter?
---

## A cuckoo filter stores only an 8–16-bit fingerprint `f` of each key, not the key. When it evicts `f` from bucket `i`, how does it find `f`'s other bucket?

---

**`j = i ⊕ hash(f)`: computed from the fingerprint alone.**

XOR is its own inverse, so either bucket yields the other without the
original key (partial-key cuckoo hashing). That gives a Bloom-like filter
that supports deletion, probes two buckets instead of `k` scattered bits,
and is smaller below ~3 % false positives.
