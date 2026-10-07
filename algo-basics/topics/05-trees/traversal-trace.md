---
id: tree-traversal-trace
kind: trace
version: 1
level: 2
tags: [trees, traversal, recursion, tracing]
requires:
  - tree-traversal-orders
probes:
  1: { pre: "8 4 2 6 9", in: "2 4 6 8 9", post: "2 6 4 9 8" }
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Depth-first_search
---

```cpp
//        8
//       / \
//      4   9
//     / \
//    2   6
std::string pre, in, post;

void walk(const Node* n) {
  if (!n) return;
  pre += std::to_string(n->key) + ' ';
  walk(n->left);
  in += std::to_string(n->key) + ' ';
  walk(n->right);
  post += std::to_string(n->key) + ' ';
}

walk(root);   // @1
```

---

Preorder writes a node on the way down, so the root comes first.
Postorder writes it on the way back up, so the root comes last and every
node follows its children: the order to free a tree or total up subtree
sizes.

Inorder came out **sorted**. That is no accident: this tree is a binary
search tree, and inorder visits all of a node's smaller keys (its left
subtree) before it and all of its larger keys after it.

Verified by compiling and running an instrumented copy under GCC 16.2
(`g++ -std=c++23 -Wall -Wextra`), trailing spaces trimmed.
