---
id: heap-explain-binary-heap
kind: explain
version: 2
level: 3
tags: [heaps, priority-queue, invariants]
requires:
  - heap-pq-adt-trace
  - heap-shape-and-order
  - heap-push-trace
  - heap-op-costs
  - heap-sift-down-worked
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.wikipedia.org/wiki/Binary_heap
  - https://en.cppreference.com/w/cpp/container/priority_queue
elaborate: Say in one sentence, as to an interviewer, where in a system you know a stream of items must leave by priority rather than by arrival order.
---
An interviewer asks you how a binary heap works and why you would
reach for one. Answer aloud in about a minute.
---
- [ ] It suits repeatedly taking the largest (or smallest) key from a set that keeps changing
- [ ] Heap order makes every parent ≥ its children, so the maximum is always the root
- [ ] A push appends at the end, then swaps with its parent while that parent is smaller
- [ ] A pop moves the last element to the root, then swaps it down with its larger child until order holds
- [ ] The tree is complete, so a push or pop walks at most ⌊log₂ n⌋ + 1 levels: O(log n)
