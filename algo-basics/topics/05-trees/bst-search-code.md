---
id: tree-bst-search-code
kind: code
version: 1
level: 2
tags: [trees, bst, complexity]
requires:
  - tree-bst-property
input: chips
choices:
  c1: ["k < t.key[v]", "k > t.key[v]", "t.key[v] < k", "v < k"]
compile:
  harness: |
    struct T { int key[6], left[6], right[6]; };
    //        8
    //       / \
    //      4   9
    //     / \
    //    2   6
    //       /
    //      5
    constexpr T t{{8, 4, 9, 2, 6, 5}, {1, 3, -1, -1, 5, -1}, {2, 4, -1, -1, -1, -1}};
    static_assert(find(t, 8) == 0 && find(t, 9) == 2 && find(t, 2) == 3);
    static_assert(find(t, 5) == 5 && find(t, 6) == 4);
    static_assert(find(t, 7) == -1 && find(t, 1) == -1);
    int main() {}
refs:
  - https://doi.org/10.1145/321105.321108
  - https://en.wikipedia.org/wiki/Binary_search_tree#Searching
---

Find the index of the node holding `k` in a BST rooted at node 0, or -1.
Complete the choice of direction.

```cpp
// t.key[v]; t.left[v], t.right[v]: child indices, -1 for none
constexpr int find(const auto& t, int k) {
  int v = 0;
  while (v >= 0 && t.key[v] != k)
    v = {{c1::k < t.key[v]}} ? t.left[v] : t.right[v];
  return v;
}
```

---

Smaller keys live on the left. Each comparison moves one level down and
discards the other subtree, so a search walks a single root-to-leaf path:
**O(h)** for a tree of height h. Falling off the tree (`v == -1`) proves
`k` is absent, because the path it took is the only place `k` could be.

O(h) is O(log n) only while the tree stays short; nothing here keeps it
short.
