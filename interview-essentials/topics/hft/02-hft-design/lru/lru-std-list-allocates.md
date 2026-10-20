---
id: lru-std-list-allocates
kind: basic
version: 1
level: 3
tags: [hft, lru, caching, allocation, misconception]
requires:
  - lru-design-worked
  - hash-unordered-map-is-chained
refs:
  - https://en.cppreference.com/w/cpp/container/list
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://en.cppreference.com/w/cpp/container/unordered_map/extract
elaborate: Say aloud why a pool of nodes allocated up front can avoid both allocations on a miss.
---

## A colleague: "every operation of the textbook LRU is O(1), so it's fine on the path every request takes." `order` is a `std::list<Key>` in recency order and `index` an `unordered_map<Key, std::list<Key>::iterator>`; the cache is full and the map never grows its bucket array. How many allocations and frees does one miss make?

```cpp
index.erase(order.back());  order.pop_back();     // evict the victim
order.push_front(k);  index[k] = order.begin();   // insert the new key
```

---

**2 allocations + 2 frees: one node per container, each way.** Both
are node-based, because their references must stay valid, so every
conforming library gives each element its own separately allocated node. O(1) counts
steps, not allocator calls. Hits allocate nothing.
