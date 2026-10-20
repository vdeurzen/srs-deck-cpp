---
id: heap-pop-worked
kind: basic
version: 1
level: 1
tags: [heaps, worked-example]
requires:
  - interview-essentials/heap-shape-and-order
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
---

## Pop the max-heap stored as `9 6 8 2 5`: move the last key, 5, into the root, then swap it with its **larger** child while that child is bigger. Slot i's children are slots 2i + 1 and 2i + 2.

```
step                 array      5 at slot   its children
5 to the root        5 6 8 2    0           6 and 8
8 is larger: swap    8 6 5 2    2           none
no children: stop    8 6 5 2    2           —
```

Why does 5 swap with 8 rather than with 6?

---

**The child moving up becomes the other's parent, so it must be the larger.**

Swapping with 6 would put 6 above 8 and break heap order at once. With 8
on top, 8 ≥ 6 and 8 ≥ 5 both hold. Each swap moves 5 one level down: one
root-to-leaf walk, O(log n).
