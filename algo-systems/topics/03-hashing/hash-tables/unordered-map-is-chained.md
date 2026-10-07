---
id: hash-unordered-map-is-chained
kind: basic
version: 1
level: 3
tags: [hashing, containers]
requires:
  - hash-chaining-vs-open-addressing
refs:
  - https://eel.is/c++draft/unord.req.general
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://abseil.io/about/design/swisstables
elaborate: If you swapped one of your `unordered_map`s for `absl::flat_hash_map`, which pointer into it would you have to audit first?
---

## Why can no conforming `std::unordered_map` be a flat open-addressed table?

```cpp
std::unordered_map<int, Order> book;
Order& o = book[42];
book.reserve(1 << 20);   // rehash
o.qty = 7;               // must still be valid
```

---

**The standard keeps references valid across rehash, so elements cannot move.**

Each element therefore lives in its own node, and the bucket interface
(`bucket()`, `local_iterator`) assumes chains too. That is why
`absl::flat_hash_map` and `boost::unordered_flat_map` exist: they drop
reference stability to be faster.
