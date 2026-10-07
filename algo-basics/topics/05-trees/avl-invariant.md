---
id: tree-avl-invariant
kind: cloze
version: 1
level: 2
tags: [trees, avl, invariants]
requires:
  - tree-balance-families
  - tree-height-code
refs:
  - https://en.wikipedia.org/wiki/AVL_tree
---

```
     AVL tree          not AVL (at 3)
        4                    3
       / \                  /
      2   5                2
     / \                  /
    1   3                1
```

An AVL tree requires that the heights of a node's two subtrees differ by
at most {{c1::1::a small number}}, and it requires this at
{{c2::every node, not only the root::where the rule applies}}. In the
right-hand tree, node 3 has a left subtree of height 2 and an empty right
one, so the rule is broken even though 2 and 1 are fine.
