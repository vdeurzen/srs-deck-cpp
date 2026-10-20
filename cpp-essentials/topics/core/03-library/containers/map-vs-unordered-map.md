---
id: containers-map-vs-unordered-map
kind: basic
version: 1
level: 2
tags: [containers]
requires:
  - containers-default-to-vector
  - map-unordered-map-intro
elaborate: Say where in your own code a lookup also needed "the next key after this one", and which map that forces.
refs:
  - https://en.cppreference.com/w/cpp/container/map/lower_bound
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## An index keyed by name must answer lookups by key range [`"m"`, `"p"`]. `std::map` or `std::unordered_map`?

---

**`std::map`: it keeps keys sorted, so `lower_bound` finds where a range starts.**

`std::unordered_map` places keys by hash, in no specified order, so a range
query scans every element. For exact-key lookup only, `unordered_map` is the
default: its average cost doesn't grow with the key count; `map`'s grows
with log n.
