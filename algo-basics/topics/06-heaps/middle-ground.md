---
id: heap-middle-ground
kind: basic
version: 1
level: 2
tags: [foundations, heaps, priority-queue, complexity]
requires:
  - heap-unsorted-extract-code
  - heap-sorted-insert-trace
elaborate: Where else does keeping only enough order beat keeping none or all of it?
refs:
  - https://doi.org/10.1145/512274.512284
  - https://xlinux.nist.gov/dads/HTML/heap.html
---

## An unsorted array makes extract-min O(n); a sorted one makes insert O(n). The keys sit in a complete binary tree about log₂ n levels tall. What order rule keeps the minimum at the root yet lets an update repair just one root-to-leaf path?

```
        o
       / \
      o   o
     / \
    o   o
```

---

**Each parent ≤ its children; siblings stay unordered.**

The root is ≤ everything below it, so it is the minimum. A changed key
can only clash with its parent or its children, so each repair walks one
path: about 20 levels for 10⁶ keys, so insert and extract-min are both
O(log n). That tree is a min-heap.
