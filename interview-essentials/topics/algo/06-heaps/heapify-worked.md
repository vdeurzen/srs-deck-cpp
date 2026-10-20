---
id: heap-heapify-worked
kind: basic
version: 1
level: 2
tags: [heaps, worked-example]
requires:
  - heap-sift-down-worked
refs:
  - https://doi.org/10.1145/355588.365103
  - https://en.cppreference.com/w/cpp/algorithm/make_heap
---

## Turn the array `3 1 2 5 4` into a max-heap by sifting down slot 1, then slot 0. Slots 2, 3 and 4 have no children.

```
step                      array        why
start                     3 1 2 5 4    slots 2–4 are leaves
sift slot 1: 1 vs 5, 4    3 5 2 1 4    5 is larger: swap
sift slot 0: 3 vs 5, 2    5 3 2 1 4    5 is larger: swap
3 at slot 1: 3 vs 1, 4    5 4 2 1 3    4 is larger: swap
3 at slot 4: stop         5 4 2 1 3    no children
```

Why must slot 1 be sifted before slot 0?

---

**Sifting a slot down is correct only once both subtrees below it are heaps.**

Sift-down compares only with the children. Done first, slot 0 would see
1 and 2, keep 3 on top and stop; fixing slot 1 afterwards would lift 5
under 3, a broken pair. Slot 1's subtrees are leaves, already heaps.
