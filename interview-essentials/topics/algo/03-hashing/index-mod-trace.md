---
id: hashing-index-mod-trace
kind: basic
version: 3
level: 1
tags: [foundations, hash-functions]
requires:
  - hashing-direct-address-limit
elaborate: "Say aloud why a table of m buckets can accept keys of any size, and what it gives up in exchange."
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2–11.3
---

## A hash table keeps m = 8 *buckets* (slots). A *hash function* h turns a key into a number, and key k goes to ("hashes to") bucket `h(k) % m`. With `h(k) = k`, which bucket does key 42 go to?

---

**Bucket 2, because 42 % 8 = 2.**

`% m` folds any hash value into 0 … m − 1, so 8 buckets accept keys
of any size. The price: different keys can land together. Key 50 also
goes to bucket 2.
