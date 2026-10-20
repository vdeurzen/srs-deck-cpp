---
id: rq-fenwick-code
kind: code
version: 1
level: 3
tags: [fenwick-tree, range-queries, bit-tricks, lc-307]
input: chips
choices:
  c1: ["i & -i", "i & (i - 1)", "1", "i"]
compile:
  harness: |
    constexpr bool sums() {
      const long long a[9] = {0, 5, 3, 7, 9, 6, 4, 1, 2};   // a[1..8]
      V t(9);
      for (int i = 1; i <= 8; ++i) add(t, i, a[i]);
      long long run = 0;
      for (int i = 1; i <= 8; ++i) if (prefix(t, i) != (run += a[i])) return false;
      add(t, 3, 10);                                          // a[3] = 17
      return prefix(t, 5) - prefix(t, 1) == 3 + 17 + 9 + 6    // sum of a[2..5]
          && prefix(t, 8) == 37 + 10 && prefix(t, 2) == 8;
    }
    static_assert(sums());
    int main() {}
requires:
  - rq-segment-signal
  - interview-essentials/foundations-bits-trace
refs:
  - https://leetcode.com/problems/range-sum-query-mutable/
  - https://doi.org/10.1002/spe.4380240306
  - https://cp-algorithms.com/data_structures/fenwick.html
elaborate: Range Sum Query - Mutable (LC 307) is 0-indexed and gives `update(index, val)`, a new value rather than a change. How do you turn that into a call to `add`, and what does `sumRange(left, right)` become?
---

A Fenwick tree keeps point updates and prefix sums O(log n) in one
array `t[1..n]`: each `t[i]` holds the sum of one block of `a` ending
at index `i`. `prefix` walks down through the blocks to the left.
Complete the step that walks `add` up to every block that covers `i`.

```cpp
#include <vector>
using V = std::vector<long long>;
constexpr void add(V& t, int i, long long x) {      // a[i] += x, 1-based
  for (; i < int(t.size()); i += {{c1::i & -i}}) t[i] += x;
}
constexpr long long prefix(const V& t, int i) {     // a[1] + ... + a[i]
  long long s = 0;
  for (; i > 0; i &= i - 1) s += t[i];
  return s;
}
```

---

**`i & -i`: add the lowest set bit.** Block `t[i]` has length `i & -i`, so
the next block that also covers `i` ends at `i + (i & -i)`: 3 → 4 → 8.
At most log₂ n steps each way.

`i & (i - 1)` is the query's step copied: at `i = 1` it adds 0 and never
ends. `1` updates every later node, so a prefix counts `a[i]` more than
once; `i` doubles, 3 → 6, and misses node 4.
