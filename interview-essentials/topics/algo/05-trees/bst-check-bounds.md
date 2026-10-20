---
id: tree-bst-check-bounds
kind: code
version: 1
level: 2
tags: [trees, bst, invariants, misconception]
requires:
  - tree-bst-property
  - technique-call-stack-worked
  - tree-node-links
  - cpp-essentials/ptr-arrow-member
elaborate: Where else does a property have to hold for a whole region rather than for neighbours — a sorted array checked pairwise, a heap, a lock order?
input: chips
choices:
  c1: ["lo, n->key", "lo, hi", "n->key, hi", "INT_MIN, n->key"]
  c2: ["n->key, hi", "lo, hi", "lo, n->key", "n->key, INT_MAX"]
compile:
  harness: |
    //    5          5          5
    //   / \        / \        / \
    //  3   8      3   8      3   8
    //     /          /        \
    //    4          6          7
    constexpr Node n3{3, nullptr, nullptr}, n4{4, nullptr, nullptr};
    constexpr Node n6{6, nullptr, nullptr}, n7{7, nullptr, nullptr};
    constexpr Node n8a{8, &n4, nullptr}, n8b{8, &n6, nullptr}, n8c{8, nullptr, nullptr};
    constexpr Node n3c{3, nullptr, &n7};
    constexpr Node bad{5, &n3, &n8a}, good{5, &n3, &n8b}, bad_left{5, &n3c, &n8c};
    static_assert(!is_bst(&bad, INT_MIN, INT_MAX));
    static_assert(is_bst(&good, INT_MIN, INT_MAX));
    static_assert(!is_bst(&bad_left, INT_MIN, INT_MAX));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Binary_search_tree#Verification
---

The tree: root 5 with children 3 and 8; 8's left child is 4. Every node
is larger than its left child and smaller than its right child, yet it
is not a BST. Complete both recursive calls so `is_bst` rejects it
(`INT_MIN` and `INT_MAX`, from `<climits>`, are the smallest and largest
`int`).

```cpp
#include <climits>
struct Node { int key; const Node* left; const Node* right; };

// true if every key in n's subtree lies strictly between lo and hi
constexpr bool is_bst(const Node* n, int lo, int hi) {
  if (n == nullptr) return true;
  if (n->key <= lo || n->key >= hi) return false;
  return is_bst(n->left, {{c1::lo, n->key}}) && is_bst(n->right, {{c2::n->key, hi}});
}
```

---

4 sits in 5's **right** subtree, so it must exceed 5 as well as stay below
8. Checking each parent against its children misses that: the invariant
is about every ancestor. Passing `(n->key, hi)` down narrows the window
at every step, so each node is checked against all its ancestors at
once, visiting each node only once. The left call mirrors it.

`INT_MIN, n->key` or `n->key, INT_MAX` drops an inherited bound, which
is exactly the children-only check, and accepts a bad tree; a search for
4 would turn left at 5 and never find it.
