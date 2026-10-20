---
id: tree-bst-delete-one-child
kind: basic
version: 1
level: 2
tags: [trees, bst]
requires:
  - tree-bst-rule
elaborate: "Say in one sentence why this case needs no search below the node, while deleting a node with two children does."
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Deletion
---

## Delete 30 from this binary search tree. Which node takes its place as 50's left child?

```
        50
       /  \
     30    70
       \
        40
       /
     35
```

---

**40, 30's only child, with 35 still hanging under it.**

Every key under 30 already lies on the correct side of 50 and of every
other ancestor, so the child's whole subtree can move up one level.
Moving 35 up instead would leave 40 to be re-hung somewhere.
