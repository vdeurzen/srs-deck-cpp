---
id: hash-unordered-map-is-chained
kind: basic
version: 1
level: 3
tags: [hashing, containers]
requires:
  - hash-chaining-vs-open-addressing
  - cpp-essentials/containers-stable-references
  - cpp-essentials/iter-map-subscript-inserts
refs:
  - https://eel.is/c++draft/unord.req.general
  - https://en.cppreference.com/w/cpp/container/unordered_map
  - https://abseil.io/about/design/swisstables
elaborate: If you swapped one of your `unordered_map`s for a faster flat table, which pointer into it would you have to audit first?
---

## A rehash rebuilds the table with more buckets. Why can no `std::unordered_map` that meets the standard be a flat open-addressed table?

```cpp
struct Order { int qty; };
std::unordered_map<int, Order> book;
Order& o = book[42];
book.reserve(1 << 20);   // rehash
o.qty = 7;
```

---

**The standard keeps references valid across rehash, so elements cannot move.**

So each element is allocated separately (in practice a node), and a
rehash only relinks those nodes into the new buckets. Flat hash tables outside the standard
library are faster precisely because they drop that guarantee.
