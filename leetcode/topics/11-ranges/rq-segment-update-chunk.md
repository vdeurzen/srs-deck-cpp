---
id: rq-segment-update-chunk
kind: chunk
version: 1
level: 3
tags: [segment-tree, range-queries, lc-307]
expose_ms: 6000
compile:
  harness: |
    #include <vector>
    constexpr void build(auto& t, int n) {   // internal nodes from n - 1 down
      for (int i = n - 1; i > 0; --i) t[i] = t[2 * i] + t[2 * i + 1];
    }
    constexpr bool five() {          // n = 5 need not be a power of two
      const int n = 5;
      std::vector<int> t(2 * n);
      for (int i = 0; i < n; ++i) t[n + i] = i + 1;      // a = {1, 2, 3, 4, 5}
      build(t, n);
      if (t[1] != 15) return false;
      update(t, n, 2, 10);                                // a = {1, 2, 10, 4, 5}
      return t[1] == 22 && t[n + 2] == 10;
    }
    static_assert(five());
    constexpr bool eight() {
      const int n = 8;
      std::vector<int> t(2 * n);
      for (int i = 0; i < n; ++i) t[n + i] = 1;
      build(t, n);
      update(t, n, 5, 4);                                 // leaf 13: 12+13 -> 6, 7 -> 3, 1
      return t[6] == 5 && t[3] == 7 && t[2] == 4 && t[1] == 11 && t[7] == 2;
    }
    static_assert(eight());
    int main() {}
requires:
  - rq-segment-signal
  - interview-essentials/heap-child-index-code
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://codeforces.com/blog/entry/18051
  - https://cp-algorithms.com/data_structures/segment_tree.html
elaborate: "`t[i] + t[i ^ 1]` puts `i` first even when it is the right child. Which operations would that break, and how would you write the parent update for them?"
---

```cpp
constexpr void update(auto& t, int n, int i, int v) {
  for (t[i += n] = v; i > 1; i /= 2) t[i / 2] = t[i] + t[i ^ 1];
}
```

---

**Point update in a bottom-up segment tree: write the leaf, then
re-sum each ancestor from its two children.** The tree is one array of
2n: leaves at `t[n..2n)`, node `v`'s children at `2v` and `2v + 1`,
`t[1]` the root, `t[0]` unused.

`i += n` turns the array index into its leaf. `i ^ 1` is the sibling,
`i / 2` the parent, and the loop stops after the root. O(log n), no
recursion. It works for any `n`, not only powers of two (commutative
ops). Forgetting the climb leaves every query that spans the leaf stale.
