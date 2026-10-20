---
id: tree-kth-smallest-trace
kind: trace
version: 2
level: 3
tags: [trees, traversal, explicit-stack, tracing, lc-230]
probes:
  1: { got: "3", "st.size()": "2" }
requires:
  - interview-essentials/tree-inorder-iterative-parsons
refs:
  - https://leetcode.com/problems/kth-smallest-element-in-a-bst/
  - Knuth, The Art of Computer Programming, Vol. 1, 3rd ed., §2.3.1, Algorithm T
elaborate: The problem's follow-up modifies the BST often (inserts and deletes) and asks for the k-th smallest often. What would you store in each node so a query no longer walks k nodes?
---

Kth Smallest Element in a BST (LC 230): return the `k`-th smallest
value (1-indexed) in a binary search tree. Here `k = 2`, and each
`next()` is one pop of the iterative inorder loop. The first call has
already returned 2: the stack holds 6, and `cur` points at 4, the right
child of 2. Trace the second call.

```cpp
//      6
//     /
//    2
//     \
//      4
//     /
//    3
std::stack<TreeNode*> st;   // holds 6
TreeNode* cur;              // points at 4

int next() {
  while (cur) { st.push(cur); cur = cur->left; }
  TreeNode* n = st.top(); st.pop();
  cur = n->right;
  return n->val;
}

int main() {
  int got = next();   // @1
}
```

---

The next value after 2 is not 4 or 6 but the **leftmost node of 2's
right subtree**. The call pushes 4, dives to 3, pushes it, and pops 3:
the answer. 4 and 6 stay on the stack, waiting their turn, so the stack
never holds more than one root-to-leaf path. The walk stops at the
k-th pop: O(h + k), not O(n).

Values from compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
