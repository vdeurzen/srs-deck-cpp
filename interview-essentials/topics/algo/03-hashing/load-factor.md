---
id: hashing-load-factor
kind: basic
version: 1
level: 2
tags: [hashing, load-factor]
elaborate: "If memory were tight, what load factor would you pick, and what would lookups cost you?"
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map/load_factor
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 11
requires:
  - hashing-chaining
  - cpp-essentials/map-unordered-map-intro
---

## A chained table holds 6000 keys in 1000 buckets. With a hash that spreads keys evenly, how many keys does an unsuccessful lookup compare against, on average?

---

**6: the load factor α = n / m = 6000 / 1000, the average chain length.**

Lookup cost is O(1 + α): one hash plus one chain. So the O(1) promise
needs α bounded, which is why tables grow when α passes a limit
(`std::unordered_map`'s default `max_load_factor` is 1.0).
