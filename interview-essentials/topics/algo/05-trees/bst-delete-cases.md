---
id: tree-bst-delete-cases
kind: cloze
version: 1
level: 2
tags: [trees, bst]
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
requires:
  - tree-bst-rule
  - tree-traversal-orders
---

```
            50
          /    \
        30      70
       /  \    /  \
     20    40 60   80
```

Deleting a leaf such as 20 just clears its parent's link. Deleting a node
with one child links that child to the node's parent. Deleting 50, which
has two children, copies in its {{c1::in-order successor::a neighbour in sorted order}},
here 60, and then deletes that node instead:
an easy case, because it has no {{c2::left::which side?}} child.

---

The successor is the smallest key in 50's right subtree: the next key in
sorted order. Copying it up keeps every key on the left smaller and every
key on the right larger. Being the leftmost node of that subtree, it has
no left child, so removing it is the leaf or one-child case.
