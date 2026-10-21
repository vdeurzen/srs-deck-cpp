---
id: tree-lca-trace
kind: trace
version: 1
level: 3
tags: [trees, recursion, tracing]
probes:
  1: { got: "9", calls: "5" }
requires:
  - tree-lca-worked
  - linear-list-node
  - cpp-essentials/expr-conditional-operator
refs:
  - https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/
  - https://cp-algorithms.com/graph/lca.html
elaborate: Say in one sentence, as to an interviewer, what each call of this recursion reports to its parent.
---

The lowest common ancestor of the nodes holding 9 and 8. A pointer used
as a condition is true when it is not null. Write `got` as the value of
the node it points at.

```cpp
struct TreeNode { int val; TreeNode* left; TreeNode* right; };
// root holds 4; 4's children 7 and 9; 9's children 2 and 8
// nine and eight point at the nodes holding 9 and 8
int calls = 0;
TreeNode* lca(TreeNode* r, TreeNode* p, TreeNode* q) {
  calls = calls + 1;
  if (!r || r == p || r == q) return r;
  TreeNode* a = lca(r->left, p, q);
  TreeNode* b = lca(r->right, p, q);
  if (a && b) return r;
  return a ? a : b;
}
TreeNode* got = lca(root, nine, eight);   // @1
```

---

The calls go 4, 7, 7's two empty children, then 9: five in all. 9 is
`p`, so it returns at once and 2 and 8 are never visited. The root gets
none from the left and 9 from the right, and passes 9 up: 9 is an
ancestor of 8, so it is their LCA.

Values from running it under GCC 16.2.
