---
id: hashing-pigeonhole
kind: basic
version: 1
level: 1
tags: [foundations, collisions]
requires:
  - hashing-index-mod-trace
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., §11.2
---

## Keys are arbitrary 64-bit integers and the table has 1000 buckets. Why can no hash function, however clever, keep every two different keys in different buckets?

---

**There are 2⁶⁴ possible keys and only 1000 buckets, so some bucket must receive at least 2⁶⁴ / 1000 of them.**

Any two keys from that bucket collide, whatever the function (the
pigeonhole principle). So a hash table cannot avoid collisions; it must
store them, for example as a list (a *chain*) per bucket.
