---
id: tree-terms
kind: cloze
version: 1
level: 1
tags: [trees, vocabulary]
requires:
  - tree-recursive-def
elaborate: "Name a tree you work with, such as a directory tree or a DOM, and say aloud what one of its subtrees and one of its leaves would be."
refs:
  - https://en.wikipedia.org/wiki/Binary_tree
  - https://en.wikipedia.org/wiki/Tree_(data_structure)
---

```
        8
       / \
      4   9
     / \
    2   6
       /
      5
```

In this binary tree 8 is the root, and 2, 5 and 9 have no children, so
they are the {{c1::leaves::a name for childless nodes}}. 4 together with
2, 6 and 5 forms the {{c2::subtree::a part of the tree}} rooted at 4.

---

A subtree is a node with everything below it, so it is itself a tree;
that is what lets tree code recurse on each child. A leaf's subtrees are
both empty.
