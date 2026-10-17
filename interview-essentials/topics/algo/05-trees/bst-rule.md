---
id: tree-bst-rule
kind: basic
version: 1
level: 1
tags: [foundations, trees, bst, invariants]
refs:
  - https://doi.org/10.1145/321105.321108
  - https://xlinux.nist.gov/dads/HTML/binarySearchTree.html
requires:
  - tree-terms
---

## A binary search tree with distinct keys keeps smaller keys to a node's left and larger keys to its right. Which keys could stand in the slot marked `x`?

```
        15
       /  \
      9    22
       \
        x
```

---

**Any key strictly between 9 and 15.**

`x` is right of 9, so larger than 9, and it sits in 15's left subtree, so
smaller than 15. "Left" means the whole left subtree, not just the left
child. Checking only the parent would allow 17, and a search for 17
turns right at 15 and never finds it.
