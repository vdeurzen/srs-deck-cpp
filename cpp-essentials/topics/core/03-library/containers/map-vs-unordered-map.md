---
id: containers-map-vs-unordered-map
kind: basic
version: 1
level: 2
tags: [containers]
requires:
  - containers-default-to-vector
refs:
  - https://en.cppreference.com/w/cpp/container/map/lower_bound
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## An index keyed by name must answer lookups by key range [`"m"`, `"p"`]. `std::map` or `std::unordered_map`?

---

**`std::map`: it keeps keys sorted, so `lower_bound` finds where a range starts.**

`std::unordered_map` scatters keys across hash buckets in no specified
order, so a range query means scanning every element. For lookup by exact
key only, `unordered_map` is the default: average O(1) against `map`'s
O(log n).
