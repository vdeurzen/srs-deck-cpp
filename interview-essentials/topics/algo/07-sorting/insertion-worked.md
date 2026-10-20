---
id: sort-insertion-worked
kind: basic
version: 1
level: 1
tags: [foundations, sorting, worked-example]
requires:
  - sort-sorted-postcondition
refs:
  - https://algs4.cs.princeton.edu/21elementary/
  - https://en.wikipedia.org/wiki/Insertion_sort
---

## Insertion sort on `2 3 1`: take each key in turn and move it left past the larger keys of the sorted prefix (the keys before it, already in order). `_` is the gap a shift leaves.

```
step                     array    why
key 3: 3 < 2 is false    2 3 1    stays after 1 comparison
key 1: 1 < 3 is true     2 _ 3    3 shifts right
key 1: 1 < 2 is true     _ 2 3    2 shifts right
key 1: front reached     1 2 3    1 fills slot 0
```

Why may key 3 stop after comparing it with 2 alone?

---

**The prefix is sorted, so 2, its last key, is also its largest.**

3 is not smaller than the largest key before it, so it is not smaller
than any of them: no further comparison could move it. On input that is
already sorted, every key stops this way.
