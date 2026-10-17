---
id: rq-segment-query-code
kind: code
version: 1
level: 4
tags: [segment-tree, range-queries, lc-307]
input: chips
choices:
  c1: ["t[--r]", "t[r--]", "t[r++]", "t[r]"]
compile:
  harness: |
    constexpr bool all_ranges(std::vector<int> a) {
      const int n = a.size();
      std::vector<int> t(2 * n);
      for (int i = 0; i < n; ++i) t[n + i] = a[i];
      for (int i = n - 1; i > 0; --i) t[i] = t[2 * i] + t[2 * i + 1];
      for (int l = 0; l < n; ++l)
        for (int r = l; r <= n; ++r) {
          int want = 0;
          for (int i = l; i < r; ++i) want += a[i];
          if (sum(t, n, l, r) != want) return false;
        }
      return true;
    }
    static_assert(all_ranges({1, 3, 5}));                    // LC 307, example 1
    static_assert(all_ranges({5, 2, 6, 1, 3, 4, 7, 0}));
    static_assert(all_ranges({4, -1, 9, 2, 8, -6, 3}));      // n = 7
    int main() {}
requires:
  - rq-segment-update-chunk
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://codeforces.com/blog/entry/18051
  - https://cp-algorithms.com/data_structures/segment_tree.html
elaborate: Range Sum Query - Mutable (LC 307) asks for `sumRange(left, right)`, which includes `right`. What do you pass as `r`, and what goes wrong if you pass `right` itself?
---

Bottom-up segment tree: leaves at `t[n..2n)`, `t[v] = t[2v] + t[2v + 1]`.
`sum` returns the sum of `a[l..r)` by moving both ends up one level per
turn, taking a node whenever an end cannot be covered by a parent.
Complete the right end.

```cpp
#include <vector>
constexpr int sum(const auto& t, int n, int l, int r) {
  int s = 0;
  for (l += n, r += n; l < r; l /= 2, r /= 2) {
    if (l & 1) s += t[l++];
    if (r & 1) s += {{c1::t[--r]}};
  }
  return s;
}
```

---

**`t[--r]`: `r` is exclusive, so the node to take is the one just left of it.**
An odd `l` is a right child: its parent would also cover `l - 1`, so
take `t[l]` alone and step past it. An odd `r` means the node before it,
`r - 1`, is a left child whose parent would reach `r`; take it and move
`r` onto it. Each level takes at most two nodes: O(log n).

`t[r--]` and `t[r]` read the node at `r`, outside the range. `t[r++]`
copies the left end's shape onto the wrong side.
