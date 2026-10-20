---
id: tree-node-links
kind: basic
version: 1
level: 1
tags: [foundations, trees, pointers]
requires:
  - tree-terms
  - linear-list-node
  - cpp-essentials/const-pointer-read-rule
  - cpp-essentials/constexpr-fn-static-assert
elaborate: "Say aloud why tree code in C++ tests a child pointer against `nullptr` before following it."
refs:
  - https://en.cppreference.com/w/cpp/language/pointer#Null_pointers
  - https://en.wikipedia.org/wiki/Binary_tree#Using_nodes_and_references
---

## In C++ a binary tree node is usually a struct holding a pointer to each child. Which of `a`, `c` and `root` are leaves?

```cpp
struct Node { int key; const Node* left; const Node* right; };
constexpr Node a{2, nullptr, nullptr};
constexpr Node c{9, nullptr, nullptr};
constexpr Node root{5, &a, &c};
```

---

**`a` and `c`: both their child pointers are `nullptr`, an empty subtree.**

`root` points at `a` and `c`, so it is the tree 5 with children 2 and 9.
A null link is how the code says "no child here", which is the base case
of every recursive walk.
