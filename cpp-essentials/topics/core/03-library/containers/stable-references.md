---
id: containers-stable-references
kind: basic
version: 1
level: 2
tags: [containers, lifetime]
requires:
  - containers-reference-invalidated-by-growth
  - deque-basics
elaborate: Say what you would lose by picking a linked list here instead, and when that loss would not matter.
refs:
  - https://en.cppreference.com/w/cpp/container/deque
  - https://en.cppreference.com/w/cpp/container#Iterator_invalidation
---

## Other code keeps pointers to your elements while you keep appending, and you still need O(1) indexing (reaching element i costs the same for every i). Which standard container fits?

---

**`std::deque`: appending at either end never moves existing elements.**

It stores elements in fixed-size blocks, so growth adds a block instead of
relocating everything. Pointers and references survive `push_back` and
`push_front` (iterators don't). A linked list keeps them too, but gives
up indexing.
