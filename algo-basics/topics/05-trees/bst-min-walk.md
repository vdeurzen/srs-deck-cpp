---
id: tree-bst-min-walk
kind: code
version: 1
level: 2
tags: [foundations, trees, bst]
requires:
  - interview-essentials/tree-bst-rule
  - tree-node-pointers
input: chips
choices:
  c1: ["n->left != nullptr", "n != nullptr", "n->right != nullptr", "n->left == nullptr"]
compile:
  harness: |
    constexpr bool check() {
      //        50
      //       /  \
      //     30    80
      //       \   /
      //       40 60
      Node n40{40}, n60{60}, n30{30, nullptr, &n40}, n80{80, &n60}, r{50, &n30, &n80};
      return min_key(&r) == 30 && min_key(&n80) == 60 && min_key(&n40) == 40;
    }
    static_assert(check());
    int main() {}
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Searching
---

In a binary search tree, every key in a node's left subtree is smaller
than it and every key in its right subtree larger. Complete the loop so
`min_key` returns the smallest key of a non-empty BST.

```cpp
struct Node { int key; Node* left = nullptr; Node* right = nullptr; };

constexpr int min_key(const Node* n) {
  while ({{c1::n->left != nullptr}}) n = n->left;
  return n->key;
}
```

---

Anything smaller than `n` lies in its left subtree, so go left until
there is no left subtree: that node is the minimum. Mirror it (go right)
for the maximum. The minimum need not be a leaf: here it is 30, whose
right child is 40.

          50
         /  \
       30    80
         \   /
         40 60

One root-to-node path: O(height). `n != nullptr` walks off the tree and
dereferences null; `n->left == nullptr` stops at once and returns the
root.
