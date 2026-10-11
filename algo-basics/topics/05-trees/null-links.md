---
id: tree-null-links
kind: basic
version: 1
level: 2
tags: [foundations, trees, counting]
requires:
  - tree-node-pointers
elaborate: A recursive walk over this tree makes how many calls in total, counting the ones that hit an empty link?
refs:
  - https://en.wikipedia.org/wiki/Binary_tree#Properties_of_binary_trees
  - https://xlinux.nist.gov/dads/HTML/tree.html
---

## A binary tree has 1000 nodes, each with a `left` and a `right` pointer. How many of those 2000 pointers are null?

---

**1001: only 999 point at a node, one for each node except the root.**

```
     b        3 nodes: 2 links used (edges), 4 null
    / \
   a   c
```

Every node but the root hangs from exactly one parent link, so n nodes
have n − 1 edges. The remaining 2n − (n − 1) = n + 1 links are empty.
