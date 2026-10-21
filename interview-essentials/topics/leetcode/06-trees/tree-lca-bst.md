---
id: tree-lca-bst
kind: basic
version: 2
level: 3
tags: [trees, bst, lca, lc-235, lc-236]
requires:
  - tree-bst-property
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-iii/
  - https://doi.org/10.1145/800125.804056
elaborate: "If each node had a parent pointer and you had no root (Lowest Common Ancestor of a Binary Tree III, LC 1650), the paths from `p` and from `q` up to the root are two linked lists: which of their nodes is the LCA?"
---

Lowest Common Ancestor of a Binary Search Tree (LC 235): return the
deepest node with both `p` and `q` in its subtree, a node counting as
in its own. Values are distinct; both nodes are present.

```
          6
        /   \
       2     8
      / \   / \
     0   4 7   9
```

## Walking down from the root for `p = 0`, `q = 4`, which test on a node's value ends the walk?

---

**Its value lies between `p` and `q`, inclusive: here at 2.**

Above it, both values lie on one side (both below 6), so step that
way. At 2 they split, or 2 is one of them: O(depth) time.
