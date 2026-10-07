---
id: seq-invalidation-rules
kind: cloze
version: 2
level: 3
requires:
  - seq-vector-vs-deque
tags: [containers, lifetime]
refs:
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
  - https://en.cppreference.com/w/cpp/container/unordered_map
---

Iterator and reference invalidation are two different guarantees, and the
standard containers deliberately differ on both.

A `std::vector` invalidates {{c1::everything::how many of iterators, pointers
and references?}} whenever it reallocates. A `std::deque` invalidates all
iterators on a push at either end but leaves {{c2::references and pointers
to the existing elements::the elements themselves never move}} valid. A
`std::map` erase invalidates {{c3::only the erased element's iterators
and references::how much of the tree?}}.

---

Node-based containers give each element its own allocation, so inserts
and erases relink nodes and never move one. Contiguous storage moves
elements, and everything pointing into it goes stale.
