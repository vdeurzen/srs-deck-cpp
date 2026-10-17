---
id: tree-complete-shape
kind: basic
version: 1
level: 1
tags: [trees, vocabulary, heaps]
requires:
  - interview-essentials/tree-terms
  - tree-depth-vs-height
refs:
  - https://en.wikipedia.org/wiki/Binary_tree#Types_of_binary_trees
  - https://xlinux.nist.gov/dads/HTML/completeBinaryTree.html
elaborate: Why does "fills from the left" matter for storing the tree in an array, while "full" alone would not be enough?
---

## Which of these binary trees are *complete*?

A binary tree is complete when every level is full except possibly the
last, and the last level's nodes sit as far left as they go.

```
   A:     1          B:     1          C:     1
         / \               / \               / \
        2   3             2   3             2   3
       / \               / \   \           /
      4   5             4   5   7         4
```

---

**A and C.** B's last level has a gap where 3's left child should be,
so its 7 is not as far left as it could go.

So a complete tree packs into an array in level order with no holes: A is
`[1 2 3 4 5]`, C is `[1 2 3 4]`.
