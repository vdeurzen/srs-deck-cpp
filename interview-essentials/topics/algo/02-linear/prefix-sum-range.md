---
id: linear-prefix-sum-range
kind: basic
version: 1
level: 1
tags: [prefix-sums, arrays]
requires:
  - linear-range-query-signal
  - complexity-big-o-scaling
elaborate: "Where else does 'precompute once, answer each query by subtraction' apply, such as a 2D grid or running counts of one character?"
refs:
  - https://en.wikipedia.org/wiki/Prefix_sum
  - https://en.cppreference.com/w/cpp/algorithm/partial_sum
---

## `p` is the prefix-sum array of `a`. How do you get the sum of the elements at indices 2, 3 and 4 without a loop?

```cpp
int a[] = {3, 1, 4, 1, 5, 9};
int p[] = {0, 3, 4, 8, 9, 14, 23};   // p[i] = a[0] + … + a[i-1]
```

---

**`p[5] - p[2]`: a range l..r sums to `p[r + 1] - p[l]`.**

Everything before index 5 minus everything before index 2:
14 − 4 = 10 = 4 + 1 + 5.

Building `p` is one O(n) pass; then each query is O(1). The leading
`p[0] = 0` lets a range starting at 0 use the same formula.
