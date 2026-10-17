---
id: tree-validate-int-limits
kind: basic
version: 1
level: 3
tags: [trees, bst, invariants, misconception, lc-98]
requires:
  - tree-bst-check-bounds
refs:
  - https://leetcode.com/problems/validate-binary-search-tree/
  - https://en.cppreference.com/w/cpp/types/climits
elaborate: Where else have you used a "can't happen" value as a sentinel (−1 for a missing index, 0 for no timestamp), and what input would make it real?
---

LC 98, validate a binary search tree, with
`-2^31 <= Node.val <= 2^31 - 1`:

```cpp
bool valid(TreeNode* n, int lo = INT_MIN, int hi = INT_MAX) {
  if (!n) return true;
  if (n->val <= lo || n->val >= hi) return false;
  return valid(n->left, lo, n->val) && valid(n->right, n->val, hi);
}
```

## It passes every example. Which smallest input makes it wrong?

---

**The one-node tree `[2147483647]` (or `[-2147483648]`): it returns false.**

The sentinels are legal values, so the strict test rejects a node that
equals one. Widen the bounds to `long long` (`LLONG_MIN`, `LLONG_MAX`),
or pass the bounding nodes as pointers, with null meaning "unbounded".
