---
id: tree-lca-chunk
kind: chunk
version: 2
level: 3
tags: [trees, lca, recursion, lc-236]
expose_ms: 12000
compile: null # a function without its TreeNode definition
requires:
  - tree-lca-trace
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii/
  - https://doi.org/10.1145/800125.804056
  - https://cp-algorithms.com/graph/lca.html
elaborate: Lowest Common Ancestor of a Binary Tree II (LC 1644) drops the promise that both `p` and `q` are in the tree, and returns null if either is missing. Which return value now lies, and what extra fact must the recursion report?
---

`TreeNode` has `val`, `left` and `right`. A pointer used as a condition
is true when it is not null.

```cpp
TreeNode* lca(TreeNode* r, TreeNode* p, TreeNode* q) {
  if (!r || r == p || r == q) return r;
  TreeNode* a = lca(r->left, p, q);
  TreeNode* b = lca(r->right, p, q);
  if (a && b) return r;
  return a ? a : b;
}
```

---

Lowest Common Ancestor of a Binary Tree (LC 236): given the root and
two nodes `p` and `q` in the tree, return the deepest node with both in
its subtree, a node counting as in its own.

**Lowest common ancestor in one postorder pass.** Each call
reports what it found in its subtree: null for neither, `p` or `q` for
one of them, the answer once both are found.

- Hitting `p` or `q` returns at once without looking below it: if the
  other one is underneath, this node *is* the answer.
- Found on both sides: `r` is the split point, so `r` is the LCA.
- Found on one side: pass that result up unchanged.

O(n) time, O(h) stack. It relies on the problem's promise that both nodes exist.
