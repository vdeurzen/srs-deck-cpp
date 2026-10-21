---
id: tree-explain-lca
kind: explain
version: 2
level: 3
tags: [trees, recognition, lc-236, lc-235]
requires:
  - tree-lca-chunk
  - tree-lca-bst
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/
  - https://cp-algorithms.com/graph/lca.html
elaborate: Where else does a tree question ask what two nodes share, such as the nearest common directory of two paths or the merge base of two git commits?
---
An interviewer says: two files sit somewhere in a directory tree; find
the closest folder that contains both. Talk it through. Answer aloud.
---
- [ ] Cue: the deepest node with both given nodes in its subtree, a node counting as in its own
- [ ] Pattern: in postorder, a node whose two subtrees each report a found node is the answer
- [ ] Example: Lowest Common Ancestor of a Binary Tree, given the root and two nodes in it
- [ ] Cost: O(n) time, since each node is visited once
- [ ] Look-alike: in a binary search tree, walk down by value to the first node between them, O(h)
