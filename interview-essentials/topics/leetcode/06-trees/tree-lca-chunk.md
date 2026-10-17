---
id: tree-lca-chunk
kind: chunk
version: 1
level: 3
tags: [trees, lca, recursion, lc-236]
expose_ms: 8000
compile:
  harness: |
    struct TreeNode { int val; TreeNode* left; TreeNode* right; };
    constexpr bool example() {       // LC 236: [3,5,1,6,2,0,8,null,null,7,4]
      TreeNode n[9] = {};
      n[0] = {3, &n[1], &n[2]};
      n[1] = {5, &n[3], &n[4]};
      n[2] = {1, &n[5], &n[6]};
      n[3] = {6, nullptr, nullptr};
      n[4] = {2, &n[7], &n[8]};
      n[5] = {0, nullptr, nullptr};
      n[6] = {8, nullptr, nullptr};
      n[7] = {7, nullptr, nullptr};
      n[8] = {4, nullptr, nullptr};
      TreeNode* r = &n[0];
      return lca(r, &n[1], &n[2]) == &n[0]       // 5, 1: split at the root
          && lca(r, &n[1], &n[8]) == &n[1]       // 5, 4: 5 is an ancestor of 4
          && lca(r, &n[7], &n[6]) == &n[0]       // 7, 8
          && lca(r, &n[3], &n[8]) == &n[1]       // 6, 4
          && lca(r, &n[7], &n[8]) == &n[4];      // 7, 4: siblings
    }
    static_assert(example());
    int main() {}
requires:
  - tree-traversal-orders
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii/
  - https://doi.org/10.1145/800125.804056
  - https://cp-algorithms.com/graph/lca.html
elaborate: Lowest Common Ancestor of a Binary Tree II (LC 1644) drops the promise that both `p` and `q` are in the tree, and returns null if either is missing. Which return value now lies, and what extra fact must the recursion report?
---

```cpp
template <class Node> constexpr Node* lca(Node* r, Node* p, Node* q) {
  if (!r || r == p || r == q) return r;
  Node* a = lca(r->left, p, q);
  Node* b = lca(r->right, p, q);
  return a && b ? r : a ? a : b;
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
  other one is underneath, this node *is* the answer, and nothing above
  will see a second hit.
- Found on both sides: `r` is the split point, so `r` is the LCA.
- Found on one side: pass that result up unchanged.

O(n) time, O(h) stack. It relies on the problem's promise that both nodes exist.
On LC write `TreeNode*` throughout; the template is here only because
the harness that defines `TreeNode` is appended after the snippet.
