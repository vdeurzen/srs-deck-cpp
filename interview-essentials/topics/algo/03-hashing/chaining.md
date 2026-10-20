---
id: hashing-chaining
kind: basic
version: 1
level: 1
tags: [hashing, chaining]
requires:
  - hashing-direct-address
  - hashing-pigeonhole
elaborate: "What would you change if one bucket's list kept growing far longer than the rest?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## A hash table has 5 buckets, each holding a list of the keys that hash there. Key 12 sits in bucket `12 % 5 = 2`; key 7, inserted later, also hashes to 2. A lookup for 7 reaches bucket 2 and meets 12 first. What does it do next?

---

**Moves on through bucket 2's list, comparing each key with 7, until a match or the end.**

This is chaining: a collision just makes one list longer, and no key
ever leaves its own bucket. A lookup hashes once, then pays one key
comparison per entry in that list, which is why short chains mean fast
lookups.
