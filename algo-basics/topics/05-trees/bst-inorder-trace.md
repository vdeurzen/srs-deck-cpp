---
id: tree-bst-inorder-trace
kind: trace
version: 1
level: 2
tags: [foundations, trees, bst, traversal, tracing]
requires:
  - tree-bst-rule
  - tree-node-pointers
probes:
  1: { out: "22 26" }
  2: { out: "22 26 40 45" }
  3: { out: "8 17 22 26 31 40 45" }
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR
  - https://doi.org/10.1145/321105.321108
---

`Node` has `key`, `left`, `right`; `nullptr` is the empty tree; `root`
points at the binary search tree drawn below.

```cpp
//          31
//        /    \
//      17      45
//     /  \    /
//    8   22  40
//          \
//           26
std::string out;
void in_order(const Node* n) {
  if (n == nullptr) return;
  in_order(n->left);
  out += std::to_string(n->key) + ' ';
  in_order(n->right);
}
in_order(root->left->right);   // @1
in_order(root->right);         // @2
out.clear();
in_order(root);                // @3
```

---

Left subtree, then the node, then the right subtree: in-order. In a BST
the left subtree holds exactly the smaller keys and the right exactly
the larger ones, so if each subtree comes out sorted, the whole walk
does. A call only ever emits its own subtree: 22's subtree is 22 and 26,
45's is 40 and 45, and `out` keeps appending until it is cleared.

So a BST *is* a sorted sequence, stored as a tree; in-order reads it
back in O(n).

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`), trailing space trimmed.
