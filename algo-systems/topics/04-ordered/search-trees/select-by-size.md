---
id: ordered-select-by-size
kind: code
version: 1
level: 4
tags: [trees, ranking, invariants]
requires:
  - ordered-order-statistics
input: chips
choices:
  c1: ["k -= L + 1;", "k -= L;", "k -= 1;", "k = L;"]
compile:
  harness: |
    //            40
    //        20      60
    //      10  30  50  70
    inline constexpr Node kTree[] = {
      {40, 1, 2, 7}, {20, 3, 4, 3}, {60, 5, 6, 3},
      {10, -1, -1, 1}, {30, -1, -1, 1}, {50, -1, -1, 1}, {70, -1, -1, 1}};
    static_assert(select(kTree, 0) == 10);
    static_assert(select(kTree, 2) == 30);
    static_assert(select(kTree, 3) == 40);
    static_assert(select(kTree, 4) == 50);
    static_assert(select(kTree, 6) == 70);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Order_statistic_tree
---

Each node stores the size of its subtree. Complete the step taken when
the k-th smallest key lies in the right subtree.

```cpp
#include <span>
struct Node { int key, left, right, size; };    // child -1 = none

constexpr int select(std::span<const Node> t, int k) {   // 0-based
  for (int i = 0;;) {                                    // 0 = root
    const int l = t[i].left, L = l < 0 ? 0 : t[l].size;
    if (k < L) i = l;
    else if (k == L) return t[i].key;
    else { {{c1::k -= L + 1;}} i = t[i].right; }
  }
}
```

---

Going right skips the whole left subtree **and** the current node, so k
drops by L + 1. Forgetting the node (`k -= L`) returns the next key up
(asking for 50 gives 60); `k -= 1` forgets the subtree and walks off a
leaf, which constant evaluation rejects as an out-of-bounds read. The
invariant: k is always the rank wanted *within the subtree at i*.
