---
id: containers-stable-references
kind: basic
version: 1
level: 2
tags: [containers, lifetime]
requires:
  - containers-reference-invalidated-by-growth
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

## Other code keeps pointers to your elements while you keep appending, and you still need O(1) indexing. Which standard sequence container fits?

---

**`std::deque`: appending at either end never moves existing elements.**

It stores elements in fixed-size blocks, so growth adds a block instead of
relocating everything. Pointers and references survive `push_back` and
`push_front` (iterators don't). `std::list` keeps them too, but gives up
indexing.
