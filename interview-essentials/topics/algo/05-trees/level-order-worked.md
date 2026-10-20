---
id: tree-level-order-worked
kind: basic
version: 1
level: 2
tags: [trees, traversal, worked-example]
requires:
  - tree-terms
  - linear-queue-adt
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search
---

## Level order visits the root, then its children, then theirs, each level left to right. It keeps a queue of nodes waiting to be visited, starting with the root.

```
    6
   / \
  2   8
     / \
    7   9
```

| take from front | add children at back | queue after |
|---|---|---|
| 6 | 2, 8 | 2 8 |
| 2 | — | 8 |
| 8 | 7, 9 | 7 9 |
| 7 | — | 9 |
| 9 | — | (empty) |

Why are 7 and 9 taken only after 2?

---

**They join the back of the queue, behind 2, which was already waiting.**

A queue hands out the oldest entry first. Children are added while
their own level is still being taken, so each level leaves the queue
before any node of the next.
