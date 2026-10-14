---
id: tree-lca-bst
kind: basic
version: 1
level: 3
tags: [trees, bst, lca, lc-235, lc-236]
requires:
  - tree-lca-chunk
  - algo-basics/tree-bst-property
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
  - https://doi.org/10.1145/800125.804056
elaborate: LC 1650 gives each node a parent pointer and no root. Which linked-list pattern finds the LCA then?
---

LC 235 is LC 236 on a binary search tree: values are distinct, and `p`
and `q` are both present. The LC 236 recursion still works, but visits
O(n) nodes.

```
          6
        /   \
       2     8
      / \   / \
     0   4 7   9
```

## Walking down from the root, how do you recognise the LCA of `p = 0` and `q = 4`?

---

**The first node whose value lies between `p` and `q`, inclusive: here 2.**

Above it, both values are on one side (0 and 4 are both below 6), so
step that way. At 2 they split, or 2 is one of them. One path from the
root: O(h) time, O(1) space, no recursion.
