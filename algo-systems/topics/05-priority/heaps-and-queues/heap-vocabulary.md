---
id: heap-vocabulary
kind: cloze
version: 2
level: 3
tags: [heaps, complexity, containers]
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://en.wikipedia.org/wiki/Binary_heap
---

A binary heap is a {{c1::complete::a tree shape}} binary tree, so it
needs no pointers: the array index alone says where each child and parent
is. Push costs O(log n) by sifting {{c2::up::a direction}}, pop costs
O(log n) by moving the last element to the root and sifting down, and
reading the maximum costs {{c3::O(1)::a complexity}}.

What a heap deliberately cannot do cheaply: find an arbitrary element,
delete one you did not pop, or iterate in order.
