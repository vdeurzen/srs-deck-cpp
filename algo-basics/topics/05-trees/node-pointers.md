---
id: tree-node-pointers
kind: chunk
version: 1
level: 1
tags: [foundations, trees, pointers]
requires:
  - tree-recursive-def
expose_ms: 6000
compile:
  harness: |
    constexpr int sum(const Node* n) {
      return n == nullptr ? 0 : n->key + sum(n->left) + sum(n->right);
    }
    constexpr int demo() {
      Node b{1}, c{3}, a{2, &b, &c};
      return sum(&a) * 10 + (b.left == nullptr && c.right == nullptr);
    }
    static_assert(demo() == 61);
    int main() {}
refs:
  - https://en.cppreference.com/w/cpp/language/data_members#Member_initialization
  - https://xlinux.nist.gov/dads/HTML/binarytree.html
---

```cpp
struct Node {
  int key;
  Node* left = nullptr;
  Node* right = nullptr;
};
```

---

**The pointer-linked binary tree node.** A tree is empty or a node with
two subtrees, and the code says exactly that: each child is a pointer,
and `nullptr` *is* the empty subtree. The links must be pointers: a
`Node` holding a `Node` by value would contain itself and have no finite
size (the compiler rejects it as an incomplete type). The default
initialisers make `Node{7}` a leaf, so no link is ever left
uninitialised.
