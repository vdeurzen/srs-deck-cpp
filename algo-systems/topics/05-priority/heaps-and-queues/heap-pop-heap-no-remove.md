---
id: heap-pop-heap-no-remove
kind: cloze
version: 1
level: 3
tags: [heaps, containers, c++]
requires:
  - heap-vocabulary
refs:
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
---

`std::pop_heap(v.begin(), v.end())` removes nothing: it swaps the root to
the back and re-heapifies the rest, so `v.size()` is unchanged. Taking
the element out is a separate {{c1::`v.pop_back()`::a vector member
function}}.
