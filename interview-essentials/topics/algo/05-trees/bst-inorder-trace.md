---
id: tree-bst-inorder-trace
kind: trace
version: 5
level: 2
tags: [foundations, trees, traversal, tracing]
requires:
  - tree-bst-inorder-worked
  - technique-call-stack-worked
  - cpp-essentials/ptr-arrow-member
  - cpp-essentials/ptr-null-pointer
probes:
  1: { second: "8", seen: "3" }
elaborate: "Where would this walk help in an interview, such as checking that a tree is a BST, and when could it stop early?"
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR
  - https://doi.org/10.1145/321105.321108
---

`root` points at a plain binary tree, not a search tree: root 6; 6's
right child is 1; 1's left child is 8. The walk counts the nodes it
emits in `seen` and records the key of the second one.

```cpp
struct Node { int key; Node* left; Node* right; };
int seen = 0, second = -1;
void in_order(Node* n) {
  if (n == nullptr) return;
  in_order(n->left);
  seen = seen + 1;
  if (seen == 2) second = n->key;
  in_order(n->right);
}
in_order(root);   // @1
```

---

6 has no left subtree, so it is emitted first. Its right call reaches
1, but 1 must finish its left subtree first, so **8 is second** and 1
third. Left subtree, node, right subtree applies at every node; only in
a BST does that order come out sorted.

(Values from running it under GCC 16.2.)
