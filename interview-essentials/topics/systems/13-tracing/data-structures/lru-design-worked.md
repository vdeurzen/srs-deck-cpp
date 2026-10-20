---
id: lru-design-worked
kind: basic
version: 1
level: 2
tags: [caching, containers, worked-example]
requires:
  - std-list-basics
  - cpp-essentials/map-unordered-map-intro
refs:
  - https://en.cppreference.com/w/cpp/container/list/splice
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://en.wikipedia.org/wiki/Cache_replacement_policies#Least_Recently_Used_(LRU)
---

## An LRU cache of capacity 2 evicts the key unused for longest. It keeps a `std::list` of keys, most recent at the front, and an `unordered_map` from each key to its list iterator. Why does `put(3)` evict 2 and not 1?

```
op       list (front → back)   map keys   what happens
put(1)   1                     1          new: push front
put(2)   2 1                   1 2        new: push front
get(1)   1 2                   1 2        found: move node to front
put(3)   3 1                   1 3        full: drop back key 2
```

---

**`get(1)` moved 1 to the front, leaving 2 at the back as least recent.**

The map finds 1's node through its stored iterator in O(1); the list
relinks that node to the front in O(1), no search. Eviction always
takes the back, so without the `get`, 1 would go.
