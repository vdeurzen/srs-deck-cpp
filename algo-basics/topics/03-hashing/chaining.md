---
id: hashing-chaining
kind: basic
version: 1
level: 1
tags: [hashing, chaining]
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## A chained hash table with 5 buckets puts key 12 in bucket `12 % 5 = 2`. Key 7 also maps to bucket 2. Where does 7 go?

---

**Into the same bucket, appended to that bucket's list (its chain).**

Each bucket holds a list of every key that hashed there, so a collision
just makes one list longer. A lookup hashes once, then compares keys
along that one list, which is why short chains mean fast lookups.
