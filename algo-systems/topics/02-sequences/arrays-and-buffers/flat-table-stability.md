---
id: seq-flat-table-stability
kind: cloze
version: 1
level: 4
requires:
  - hash-unordered-map-is-chained
tags: [containers, hashing, lifetime]
refs:
  - https://abseil.io/docs/cpp/guides/container
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

A lookup path needs `absl::flat_hash_map`'s speed, but other code keeps
long-lived references to the objects. Since the flat table moves its
elements on rehash, it maps each key to {{c1::an index::a value that
survives the move}} into a separate `std::vector` of objects, and the
references are taken through that.

---

Two lookups, one stable identity. The vector may still reallocate, so
outside code holds the index (or a handle), never `&objects[i]`.
