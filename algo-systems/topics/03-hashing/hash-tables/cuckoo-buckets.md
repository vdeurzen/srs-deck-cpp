---
id: hash-cuckoo-buckets
kind: basic
version: 1
level: 4
requires:
  - hash-cuckoo-insert
tags: [hashing, open-addressing]
refs:
  - https://www.itu.dk/people/pagh/papers/cuckoo-jour.pdf
  - https://www.cs.cmu.edu/~dga/papers/cuckoo-conext2014.pdf
---

## Two-table cuckoo hashing with one key per slot stops accepting inserts at about 50 % load. What do real implementations change to run above 90 %?

---

**Make each home a bucket of 4–8 slots (or use more hash functions).**

A key now has 8+ candidate slots instead of 2, so eviction chains rarely
loop. With 4-slot buckets a table fills to about 95 %, and a lookup still
reads just two buckets, each one or two cache lines.
