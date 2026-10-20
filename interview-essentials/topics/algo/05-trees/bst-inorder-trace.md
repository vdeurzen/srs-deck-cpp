---
id: tree-bst-inorder-trace
kind: trace
version: 4
level: 2
tags: [foundations, trees, bst, traversal, tracing]
requires:
  - tree-bst-inorder-worked
  - technique-call-stack-worked
  - cpp-essentials/ptr-arrow-member
  - cpp-essentials/ptr-null-pointer
probes:
  1: { second: "38" }
elaborate: "Where would this walk help in an interview, such as checking a BST, and when could it stop early?"
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#In-order,_LNR
  - https://doi.org/10.1145/321105.321108
---

`root` points at the binary search tree drawn below. The walk counts
the nodes it emits in `seen` and records the key of the second one.

```cpp
struct Node { int key; Node* left; Node* right; };
// root 31; 31's right child is 45; 45's left child is 38
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

The calls reach 31, then 45, then 38, but emitting waits for each left
subtree. 31 has none, so it is first. In 45's call, its left subtree, 38,
must finish before 45 is emitted, so **38 is second**. Left subtree,
node, right subtree: in a BST that order is sorted, so the second
emitted is the second smallest key.

(Values from running it under GCC 16.2.)
