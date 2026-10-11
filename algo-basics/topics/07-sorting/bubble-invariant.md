---
id: sort-bubble-invariant
kind: basic
version: 1
level: 1
tags: [foundations, sorting, bubble-sort, invariants]
refs:
  - https://www-cs-faculty.stanford.edu/~knuth/taocp.html
  - https://en.wikipedia.org/wiki/Bubble_sort
---

## A bubble-sort pass walks left to right, swapping each neighbour pair that is out of order. Why may pass k + 1 stop one slot earlier than pass k?

---

**After pass k, the k largest values sit in their final slots at the end.**

The largest unsettled value wins every comparison it meets, so it is
carried all the way right. `[4 9 2 7]`: 9 rides to the end in pass 1,
giving `[4 2 7 9]`; pass 2 need not compare against 9.
