---
id: tree-bst-check-bounds
kind: code
version: 1
level: 2
tags: [trees, bst, invariants, misconception]
requires:
  - tree-bst-property
elaborate: Where else does a property have to hold for a whole region rather than for neighbours — a sorted array checked pairwise, a heap, a lock order?
input: chips
choices:
  c1: ["k, hi", "lo, hi", "lo, k", "INT_MIN, hi"]
compile:
  harness: |
    struct T { int key[4], left[4], right[4]; };
    //    5          5
    //   / \        / \
    //  3   8      3   8
    //     /          /
    //    4          6
    constexpr T bad{{5, 3, 8, 4}, {1, -1, 3, -1}, {2, -1, -1, -1}};
    constexpr T good{{5, 3, 8, 6}, {1, -1, 3, -1}, {2, -1, -1, -1}};
    static_assert(!is_bst(bad, 0, INT_MIN, INT_MAX));
    static_assert(is_bst(good, 0, INT_MIN, INT_MAX));
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/Binary_search_tree#Verification
---

Every node here is larger than its left child and smaller than its right
child, yet it is not a BST. Complete the right-hand recursion so `is_bst`
rejects it.

```cpp
#include <climits>
//      5
//     / \
//    3   8
//       /
//      4

// true if every key in v's subtree lies strictly between lo and hi
constexpr bool is_bst(const auto& t, int v, int lo, int hi) {
  if (v < 0) return true;
  const int k = t.key[v];
  if (k <= lo || k >= hi) return false;
  return is_bst(t, t.left[v], lo, k) && is_bst(t, t.right[v], {{c1::k, hi}});
}
```

---

4 sits in 5's **right** subtree, so it must exceed 5 as well as stay below
8. Checking each parent against its children misses that: the invariant
is about every ancestor. Passing `(k, hi)` down narrows the window at
every step, so each node is checked against all its ancestors at once,
in O(n).

`INT_MIN, hi` forgets the inherited lower bound, which is exactly the
children-only check, and accepts the tree; a search for 4 would turn left
at 5 and never find it.
