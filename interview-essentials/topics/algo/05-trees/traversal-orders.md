---
id: tree-traversal-orders
kind: cloze
version: 2
level: 1
tags: [trees, traversal, recursion]
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search
requires:
  - tree-terms
---

Depth-first traversals visit the left subtree before the right and
differ in when they visit the node itself: preorder before both
subtrees, inorder between them, postorder after both.

```
      7
     / \
    3   9
   / \
  1   5
```

Preorder visits this tree as {{c1::7 3 1 5 9::a sequence of keys}};
postorder as {{c2::1 5 3 9 7::a sequence of keys}}.

---

Each rule applies at every node, not only the root. Preorder: 7, then
all of 3's subtree (3 1 5), then 9. Postorder finishes 3's whole subtree
(1 5 3) and then 9 before it can emit 7. Inorder gives 1 3 5 7 9.
