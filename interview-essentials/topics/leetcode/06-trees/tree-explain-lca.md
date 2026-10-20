---
id: tree-explain-lca
kind: explain
version: 1
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
An interviewer asks how you find the deepest node that has two given
nodes of a binary tree below it, and how the answer changes when the
tree is ordered. Answer aloud.
---
- [ ] Cue: the deepest node with both given nodes in its subtree, a node counting as in its own
- [ ] Pattern: in postorder, a node whose two subtrees each report a found node is the answer
- [ ] Example: Lowest Common Ancestor of a Binary Tree, given the root and two nodes in it
- [ ] Cost: O(n) time, since each node is visited once
- [ ] Look-alike: in a binary search tree, walk down by value to the first node between them, O(h)
