---
id: heap-sorted-insert-trace
kind: basic
version: 2
level: 2
tags: [foundations, heaps, priority-queue, arrays, complexity]
requires:
  - interview-essentials/heap-pq-adt-trace
elaborate: When would you still pick this sorted vector over a heap, given how often you insert compared with how often you extract?
refs:
  - https://xlinux.nist.gov/dads/HTML/priorityque.html
  - https://en.wikipedia.org/wiki/Insertion_sort
---

## A min-priority queue keeps its keys in a vector in **decreasing** order, such as `90 70 50 30`. The minimum sits at the back, so extract-min is `back()` then `pop_back()`, O(1). What does insert cost in the worst case?

---

**Θ(n): a new maximum shifts every key one slot right.**

The vector must stay in order, so every key smaller than the new one
moves one slot toward the back: inserting 95 into `90 70 50 30` moves
all 4. A heap makes both operations O(log n).
