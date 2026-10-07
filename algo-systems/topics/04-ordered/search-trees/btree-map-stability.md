---
id: ordered-btree-map-stability
kind: basic
version: 1
level: 3
tags: [trees, containers, invalidation]
requires:
  - ordered-rbtree-vs-btree
refs:
  - https://abseil.io/docs/cpp/guides/container
  - https://en.cppreference.com/w/cpp/container/map
---

## You swap `std::map` for `absl::btree_map` to get the cache win. What code that compiled before can now break at run time?

---

**Code holding pointers, references or iterators across an insert or erase.**

A B-tree moves elements between nodes when they split and merge, so
`absl::btree_map` gives no pointer stability; `std::map`'s node-per-element
layout does. It is the same trade a flat hash table makes against
`std::unordered_map`.
