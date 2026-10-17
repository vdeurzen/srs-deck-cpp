---
id: iter-size-vs-capacity
kind: basic
version: 1
level: 1
tags: [containers, vector]
refs:
  - https://en.cppreference.com/w/cpp/container/vector/capacity
  - https://en.cppreference.com/w/cpp/container/vector/size
---

## A `std::vector<int> v` reports `v.size() == 3` and `v.capacity() == 8`. What does each number count?

---

**`size()` counts elements that exist; `capacity()` counts slots the current buffer holds.**
The five spare slots contain no `int`s yet, so `v[5]` is still out of range.
`push_back` fills a spare slot while `size() < capacity()`; only when the two
are equal must the vector allocate a bigger buffer.
