---
id: hash-go-map-iteration-order
kind: basic
version: 2
level: 2
requires:
  - interview-essentials/hashing-load-factor
tags: [hashing, testing]
elaborate: Which test of yours would start failing if your map's iteration order changed, and how would you make it order-independent?
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://eel.is/c++draft/unord.req.general
---

## A test prints every entry of a `std::unordered_map` and compares the output with a saved file. After one more key is inserted, nearly every line is in a different place. Why?

---

**That insert triggered a rehash, which redistributed every key over the new buckets.**

Iteration walks the buckets, and a key's bucket is its hash modulo the
bucket count, so changing the count reorders everything. The standard
leaves the order unspecified; for stable output, collect the keys and
sort them.
