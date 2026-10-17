---
id: lru-std-list-allocates
kind: basic
version: 1
level: 4
tags: [hft, lru, caching, allocation, misconception]
requires:
  - trace-lru-order
  - hash-unordered-map-is-chained
refs:
  - https://en.cppreference.com/w/cpp/container/list
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://en.cppreference.com/w/cpp/container/unordered_map/extract
elaborate: C++17's `extract` hands you the victim's map node to re-key and reinsert. Which `std::list` call recycles the victim's list node the same way?
---

## A colleague: "every operation of the textbook LRU is O(1), so it's fine on the hot path." The cache is full and its size steady (no rehash). How many allocations and frees does one miss make?

```cpp
index.erase(order.back());  order.pop_back();     // evict the victim
order.push_front(k);  index[k] = order.begin();   // insert the new key
```

---

**2 allocations + 2 frees: one node per container, each way.** Both
are node-based, because their references must stay valid, so every
conforming library gives each element its own heap node. O(1) counts
steps, not allocator calls. Hits allocate nothing.
