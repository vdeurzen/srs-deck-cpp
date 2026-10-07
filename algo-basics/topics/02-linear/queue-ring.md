---
id: linear-queue-ring
kind: basic
version: 1
level: 2
tags: [queues, ring-buffers]
requires:
  - linear-array-insert-shift
refs:
  - https://en.cppreference.com/w/cpp/container/queue
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 10 (queues)
---

## A queue that pops with `v.erase(v.begin())` pays O(n) per pop, because every element shifts. What does a ring buffer do instead?

---

**It advances a `head` index, wrapping to 0 at the array's end: O(1) per pop.**

The elements never move; the oldest is wherever `head` points. Order is preserved
because a queue (first in, first out) only ever removes the oldest
element, which is at `head`.
