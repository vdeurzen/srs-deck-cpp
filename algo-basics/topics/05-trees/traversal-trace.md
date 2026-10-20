---
id: tree-traversal-trace
kind: trace
version: 2
level: 2
tags: [trees, traversal, recursion, tracing]
requires:
  - interview-essentials/tree-traversal-orders
  - interview-essentials/tree-bst-inorder-trace
  - cpp-essentials/vector-basics
probes:
  1: { first: "2", third: "4" }
elaborate: Which order would you use to copy a tree, and why must each node come before its children there?
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search
---

```cpp
//        8
//       / \
//      4   9
//     / \
//    2   6
std::vector<int> out;

void walk(const Node* n) {
  if (n == nullptr) return;
  walk(n->left);
  walk(n->right);
  out.push_back(n->key);
}

walk(root);
int first = out[0], third = out[2];   // @1
```

---

This walk records a node only after both its subtrees are done:
**postorder**. The first key out is the leftmost leaf, 2, not the root;
4 waits for its children 2 and 6, so it comes third. The root comes
last, which makes this the order to free a tree or total up subtree
sizes.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`).
