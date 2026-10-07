---
id: heap-op-costs
kind: cloze
version: 1
level: 2
tags: [heaps, complexity]
requires:
  - heap-push-trace
  - heap-pop-trace
  - complexity-log-halvings
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://en.wikipedia.org/wiki/Binary_heap
---

A priority queue built on a binary heap of n elements: reading the
maximum costs {{c1::O(1)::a complexity}}, because heap order puts it at
the root. Push and pop each walk one root-to-leaf path, and because the
shape is complete that path has only ⌊log₂ n⌋ + 1 levels, so each costs
O(log n). With a million elements that is {{c2::20::a number of levels}}
levels, at most 19 swaps per operation.
