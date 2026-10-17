---
id: heap-vs-bst
kind: basic
version: 1
level: 2
tags: [heaps, trees, bst, invariants]
requires:
  - heap-shape-and-order
  - tree-bst-property
refs:
  - https://en.wikipedia.org/wiki/Binary_heap
  - https://en.wikipedia.org/wiki/Binary_search_tree
---

## A balanced BST finds key 5 in O(log n). Why does this max-heap need O(n) to find it?

```
          9
        /   \
       7     8
      / \   /
     3   5 6
```

---

**A heap orders parents over children only, never left against right.**

5 < 9 says nothing about which side holds it: below 7 or below 8 are
both possible, so a search must try both subtrees. A BST's left < node <
right lets each comparison discard a side. The heap gives up search to
get a cheap maximum.
