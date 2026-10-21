---
id: hash-go-map-semantics
kind: basic
version: 3
level: 3
requires:
  - interview-essentials/hash-unordered-map-is-chained
tags: [hashing, containers, lifetime]
elaborate: Where in your C++ do you hold a pointer into a hash map, and what would you store instead if the map became a flat table?
refs:
  - https://abseil.io/docs/cpp/guides/container
  - https://abseil.io/about/design/swisstables
---

`absl::flat_hash_map` is an open-addressing table: elements sit in its
slot array.

```cpp
absl::flat_hash_map<std::string, Order> book;
Order* p = &book["a"];
for (int i = 0; i < 10'000; ++i) book[std::to_string(i)];
p->qty = 7;
```

## What happens on the last line?

---

**Undefined behaviour: growing rehashed into a new slot array, so `p` dangles.**

A flat table moves elements when it grows, unlike `std::unordered_map`'s
separately allocated nodes. Keep stable addresses by storing
`std::unique_ptr<Order>` (or `absl::node_hash_map`), or hold the key.
