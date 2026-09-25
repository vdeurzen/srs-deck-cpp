---
id: heap-vocabulary
kind: cloze
version: 1
level: 3
tags: [heaps, complexity, containers]
refs:
  - https://en.cppreference.com/w/cpp/container/priority_queue
  - https://en.wikipedia.org/wiki/Binary_heap
---

A binary heap is a **complete** tree in an array, so the children of
index `i` are at {{c1::2i+1 and 2i+2::0-based; 2i and 2i+1 if slot 0 is
wasted}} and the parent is at `(i−1)/2`. Push costs O(log n) by sifting
{{c2::up::compare with the parent, swap while it is larger}}, pop costs
O(log n) by moving the last element to the root and sifting down, and
reading the maximum costs {{c3::O(1)::it is element 0}}.

Building from an existing array is the case worth remembering
separately: `n` pushes cost O(n log n), while the bottom-up
`make_heap` costs {{c4::O(n)::because most nodes are near the bottom,
where sifting down is cheap}}.

Two library facts that cause real bugs. `std::priority_queue` is a
**max** heap by default, so a min-queue needs `std::greater<>` as the
comparator. And `std::pop_heap` does not remove anything — it swaps
the root to the back and re-heapifies the rest, so the removal is the
separate {{c5::pop_back()::on the underlying container}} that must
follow it.

What a heap deliberately cannot do: find an arbitrary element, delete
one you did not pop, or iterate in order — the operations that push
Dijkstra implementations towards lazy deletion, and anything needing
`decrease_key` towards an indexed or pairing heap.
