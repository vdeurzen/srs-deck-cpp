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
---

Iterators, pointers and references are three handles to an element, and
the standard containers deliberately differ on which of them survive.

A `std::vector` invalidates {{c1::all three::which of the three handles?}}
whenever it reallocates. A `std::deque` invalidates all iterators on a
push at either end but leaves {{c2::references and pointers::which
handles?}} to the existing elements valid. A
`std::map` erase invalidates {{c3::only the erased element's iterators
and references::how much of the tree?}}.

---

Node-based containers give each element its own allocation, so inserts
and erases relink nodes and never move one. Contiguous storage moves
elements, and everything pointing into it goes stale.
