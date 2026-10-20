---
id: hashing-chaining
kind: basic
version: 2
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

## A hash table has 5 buckets. Keys 12 and 7 both hash to bucket 2. How can the table store both so that a lookup finds either one?

---

**Each bucket holds a list (a *chain*) of its keys; a lookup scans that list.**

A lookup for 7 hashes to bucket 2, then compares each key in the chain
with 7 until a match or the end. A collision just makes one list
longer, which is why short chains mean fast lookups.
