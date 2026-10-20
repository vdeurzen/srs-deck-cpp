---
id: heap-explain-binary-heap
kind: explain
version: 1
level: 3
tags: [heaps, priority-queue, invariants]
requires:
  - heap-pq-adt-trace
  - heap-shape-and-order
  - heap-push-trace
  - heap-op-costs
  - heap-vs-bst
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Binary_heap
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: Say in one sentence, as to an interviewer, where in a system you know a stream of items must leave by priority rather than by arrival order.
---
An interviewer asks you how a binary heap works and why you would
reach for one. Answer aloud in about a minute.
---
- [ ] Problem: repeatedly take the largest (or smallest) key from a set that keeps changing
- [ ] Mechanism: a complete tree stored in an array, every parent ≥ its children, so the maximum is the root
- [ ] Example: a push appends at the end, then swaps with its parent while that parent is smaller
- [ ] Cost: push and pop each walk one root-to-leaf path, so they cost O(log n)
- [ ] Contrast: siblings are unordered, so unlike a balanced search tree it needs O(n) to find an arbitrary key
