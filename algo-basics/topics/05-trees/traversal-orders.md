---
id: tree-traversal-orders
kind: cloze
version: 2
level: 1
tags: [trees, traversal, recursion]
requires:
  - tree-terms
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search
---

Depth-first traversals visit both subtrees, left before right, and
differ in when they visit the node itself. Inorder visits it
{{c2::between the left and the right subtree::a position in time}}.

```
      7
     / \
    3   9
   / \
  1   5
```

Preorder visits this tree as {{c1::7 3 1 5 9::a sequence of keys}}.

---

Preorder visits the node before its subtrees: 7, then all of 3's
subtree (3 1 5), then 9. Inorder gives 1 3 5 7 9; postorder, node after
both subtrees, gives 1 5 3 9 7.
