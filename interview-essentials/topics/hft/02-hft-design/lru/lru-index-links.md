---
id: lru-index-links
kind: basic
version: 1
level: 3
tags: [hft, lru, caching, intrusive, allocation]
requires:
  - lru-std-list-allocates
  - stl-array-brace-zero
refs:
  - https://www.kernel.org/doc/html/latest/core-api/kernel-api.html#list-management-functions
  - https://en.cppreference.com/w/cpp/container/array
elaborate: Where else would you swap pointers for indices into a preallocated array, such as the free orders of an order book, and what would that save on each operation?
---

A full LRU cache keeps its 4 entries in slots 1–4 and its recency list as slot numbers in
two fixed arrays rather than as `std::list` nodes:

```cpp
std::array<int, 5> n{}, p{};    // n[i]: slot after i, p[i]: slot before i
n[p[s]] = n[s];  p[n[s]] = p[s];   // unlink slot s
```

## A miss evicts the victim in slot 3 and unlinks it. Where does the new key's entry go?

---

**Into slot 3 itself: the victim's slot is reused, so a miss allocates nothing.**

Every slot exists from the start; only the links change. The unlink
makes `s`'s two neighbours point at each other: two writes, no free.
