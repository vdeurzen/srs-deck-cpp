---
id: heap-sift-down-worked
kind: basic
version: 1
level: 1
tags: [heaps, worked-example]
requires:
  - heap-push-worked
  - heap-child-index-code
refs:
  - https://doi.org/10.1145/512274.512284
  - https://en.cppreference.com/w/cpp/algorithm/pop_heap
---

## Pop the max-heap stored as `9 7 8 3 5`: move the last key into the root, then sift it down, swapping it with its larger child while that child is bigger. Slot i's children are slots 2i + 1 and 2i + 2.

```
step                 array      5 at slot   its children
5 to the root        5 7 8 3    0           7 and 8
8 is larger: swap    8 7 5 3    2           none
no children: stop    8 7 5 3    2           —
```

Why does 5 swap with 8 rather than with 7?

---

**The child that moves up becomes the other child's parent, so it must be the larger.**

Swapping with 7 would put 7 above 8 and break heap order at once. With 8
on top, 8 ≥ 7 and 8 ≥ 5 both hold. Each swap moves 5 one level down, so
a pop walks one root-to-leaf path.
