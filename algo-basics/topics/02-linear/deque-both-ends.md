---
id: linear-deque-both-ends
kind: cloze
version: 1
level: 2
tags: [deques, queues]
requires:
  - linear-queue-ring
refs:
  - https://en.cppreference.com/w/cpp/container/deque
---

An editor keeps the last 100 actions: each new action is added at one end
and, when the history is full, the oldest is dropped from the other.
`std::vector` offers O(1) insertion and removal only at the back, so
dropping the oldest from its front costs O(n). `std::deque` offers O(1)
insertion and removal at {{c1::both the front and the back::where?}}.

---

A deque (double-ended queue) is the structure for "add at one end,
remove at either". `std::deque` stores fixed-size blocks plus an index of
blocks, so neither end shifts the elements; a ring buffer gives the same
two O(1) ends when the capacity is fixed.
