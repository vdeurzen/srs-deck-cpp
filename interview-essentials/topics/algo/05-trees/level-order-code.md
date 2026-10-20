---
id: tree-level-order-code
kind: code
version: 1
level: 2
tags: [trees, traversal, queues, bfs]
requires:
  - tree-level-order-worked
  - tree-node-links
  - cpp-essentials/expr-increment-value
  - cpp-essentials/ptr-arrow-member
elaborate: "Which other problems need 'all of level k before level k + 1', such as the nearest exit in a grid or the fewest moves in a puzzle?"
input: chips
choices:
  c1: ["head++", "--tail", "head", "tail - 1"]
compile:
  harness: |
    //      8         1
    //     / \       / \
    //    4   9     2   3
    //   / \       /   / \
    //  2   6     6   4   5
    constexpr Node n2{2, nullptr, nullptr}, n6{6, nullptr, nullptr}, n9{9, nullptr, nullptr};
    constexpr Node n4{4, &n2, &n6}, n8{8, &n4, &n9};
    static_assert(fourth_taken(&n8) == 2);
    constexpr Node m6{6, nullptr, nullptr}, m4{4, nullptr, nullptr}, m5{5, nullptr, nullptr};
    constexpr Node m2{2, &m6, nullptr}, m3{3, &m4, &m5}, m1{1, &m2, &m3};
    static_assert(fourth_taken(&m1) == 6);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Tree_traversal#Breadth-first_search
---

`fourth_taken` walks a tree in level order, keeping waiting nodes in
`q[head]` … `q[tail - 1]`, and returns the 4th visited node's key.
Complete the line that takes the next node.

```cpp
struct Node { int key; const Node* left; const Node* right; };
constexpr int fourth_taken(const Node* root) {
  const Node* q[8] = {root}; int head = 0, tail = 1;
  while (head < 3) {
    const Node* n = q[{{c1::head++}}];
    if (n->left != nullptr) q[tail++] = n->left;
    if (n->right != nullptr) q[tail++] = n->right;
  }
  return q[head]->key;
}
```

---

**Taking from the front makes `q` a queue**: children join at the back,
so every node of level k leaves before any of level k + 1. That is
breadth-first search on a tree, O(n).

`--tail` takes the newest entry, a stack, and the walk turns
depth-first. `head` and `tail - 1` never move past the node they take.
