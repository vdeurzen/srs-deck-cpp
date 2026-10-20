---
id: containers-mixed-lookup-by-key
kind: basic
version: 1
level: 2
tags: [containers, maps, recognition]
requires:
  - map-unordered-map-intro
  - vector-sized-constructor
elaborate: Say when the ids would be dense enough that a plain vector indexed by id beats the map, and why.
refs:
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

## 10⁵ orders have ids anywhere from 1 to 10⁹. Given an id, the code must find that order's quantity. Which standard container holds the quantities?

---

**`std::unordered_map<int, int>`, id to quantity: it stores only ids present.**

The cue is few keys spread over a huge range. A `std::vector<int>` indexed
by id would need 10⁹ slots to hold 10⁵ values; the map holds one element
per order and `find(id)` looks it up.
