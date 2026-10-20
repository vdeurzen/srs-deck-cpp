---
id: heap-push-worked
kind: basic
version: 2
level: 1
tags: [heaps, worked-example]
requires:
  - heap-shape-and-order
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/push_heap
---

## Push 6 onto the max-heap stored as `8 5 7 2`: append it, then swap it with its parent, slot (i − 1) / 2, while that parent is smaller.

```
step           array        6 at slot   its parent
append 6       8 5 7 2 6    4           slot 1, key 5
6 > 5: swap    8 6 7 2 5    1           slot 0, key 8
6 ≤ 8: stop    8 6 7 2 5    1           —
```

Why may the climb stop at the first parent that is not smaller, without
looking any higher?

---

**Everything above that parent was already in heap order; only 6 was out of place.**

Appending broke at most one parent–child pair, the one holding 6. Each
swap fixes that pair, and the parent moved down (5) is still at least its
new children. Once 6 sits under a key ≥ 6, no pair is broken.
