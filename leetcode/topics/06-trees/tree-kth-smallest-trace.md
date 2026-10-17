---
id: tree-kth-smallest-trace
kind: trace
version: 1
level: 3
tags: [trees, traversal, explicit-stack, tracing, lc-230]
probes:
  1: { got: "1", st: "5 3 2", cur: "null" }
  2: { got: "2", st: "5 3", cur: "null" }
  3: { got: "3", st: "5", cur: "4" }
requires:
  - interview-essentials/tree-inorder-iterative-parsons
refs:
  - https://leetcode.com/problems/kth-smallest-element-in-a-bst/
  - Knuth, The Art of Computer Programming, Vol. 1, 3rd ed., §2.3.1, Algorithm T
elaborate: The problem's follow-up modifies the BST often (inserts and deletes) and asks for the k-th smallest often. What would you store in each node so a query no longer walks k nodes?
---

Kth Smallest Element in a BST (LC 230): return the `k`-th smallest
value (1-indexed) in a binary search tree. Here `k = 3`, and each
`next()` is one pop of the iterative inorder loop. Write `st` as the
keys of its nodes, bottom to top, and `cur` as the key it points at,
or `null`.

```cpp
//          5
//         / \
//        3   6
//       / \
//      2   4
//     /
//    1
std::stack<TreeNode*> st;
TreeNode* cur = root;

int next() {
  while (cur) { st.push(cur); cur = cur->left; }
  TreeNode* n = st.top(); st.pop();
  cur = n->right;
  return n->val;
}

int main() {
  int got = next();   // @1
  got = next();       // @2
  got = next();       // @3
}
```

---

The first call dives to 1, pushing 5, 3, 2, 1, then pops 1.
Its right child is null, so the second call pops 2 straight away, and
the third pops 3: the answer. **3's right child is now `cur`, not
yet pushed**, and 6 has never been touched.

So the walk costs O(h + k), not O(n): it stops at the k-th pop, and
the stack never holds more than one root-to-leaf path.
