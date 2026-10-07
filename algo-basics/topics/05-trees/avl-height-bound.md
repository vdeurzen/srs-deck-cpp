---
id: tree-avl-height-bound
kind: code
version: 1
level: 3
tags: [trees, avl, complexity, recursion]
requires:
  - tree-avl-invariant
  - tree-min-height
input: chips
choices:
  c1:
    - "1 + min_nodes(h - 1) + min_nodes(h - 2)"
    - "1 + 2 * min_nodes(h - 1)"
    - "min_nodes(h - 1) + min_nodes(h - 2)"
    - "1 + min_nodes(h - 1)"
compile:
  harness: |
    static_assert(min_nodes(1) == 1 && min_nodes(2) == 2 && min_nodes(3) == 4);
    static_assert(min_nodes(4) == 7 && min_nodes(5) == 12 && min_nodes(8) == 54);
    int main() {}
refs:
  - https://en.wikipedia.org/wiki/AVL_tree#Properties
---

How skinny can an AVL tree get? The sparsest AVL tree of height h (in
levels) has a root, one subtree of height h − 1 and, as unequal as the
rule allows, the other of height h − 2. Complete the count.

```cpp
// Fewest nodes in an AVL tree of height h.
constexpr long min_nodes(int h) {
  if (h <= 0) return 0;
  if (h == 1) return 1;
  return {{c1::1 + min_nodes(h - 1) + min_nodes(h - 2)}};
}
```

---

1, 2, 4, 7, 12, 20, 33, 54: each term is a Fibonacci number minus one, so
it grows like φ^h with φ ≈ 1.618. Inverting, an AVL tree of n nodes has
height at most log_φ n ≈ **1.44 log₂ n**: at most 44 % taller than the
perfect tree, which is why every operation stays O(log n).

`1 + 2 * min_nodes(h - 1)` is the perfect tree, the *fullest* shape
(2^h − 1), not the sparsest.
