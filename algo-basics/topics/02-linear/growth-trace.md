---
id: linear-growth-trace
kind: basic
version: 2
level: 2
tags: [dynamic-arrays, amortised]
requires:
  - interview-essentials/linear-dynamic-array-growth
elaborate: Where in your own code could one slow push_back matter even though the average is constant, and how would you avoid it?
refs:
  - https://en.cppreference.com/w/cpp/container/vector/push_back
---

A dynamic array starts with capacity 1. When a push finds it full, it
allocates twice the capacity and copies every element over.

## The 9th push copies 8 elements. How many copies have all 9 pushes made?

---

**15 = 1 + 2 + 4 + 8: fewer than twice the 9 elements.**

Each doubling copies as many as all earlier ones together, plus one, so
the total stays under 2n and a push is O(1) amortised. This is a model:
`std::vector`'s growth factor is implementation-defined (libstdc++
doubles, MSVC grows by 1.5).
