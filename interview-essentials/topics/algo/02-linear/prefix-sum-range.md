---
id: linear-prefix-sum-range
kind: basic
version: 1
level: 1
tags: [prefix-sums, arrays]
refs:
  - https://en.wikipedia.org/wiki/Prefix_sum
  - https://en.cppreference.com/w/cpp/algorithm/partial_sum
---

## You must answer 1000 range-sum queries on a fixed array `a`. `p[i]` holds the sum of the first `i` elements. How do you get the sum of the elements at indices 2, 3 and 4 without a loop?

```cpp
int a[] = {3, 1, 4, 1, 5, 9};
int p[] = {0, 3, 4, 8, 9, 14, 23};   // p[i] = a[0] + … + a[i-1]
```

---

**`p[5] - p[2]`: everything before 5 minus everything before 2.**
Here 14 − 4 = 10 = 4 + 1 + 5.

Building `p` is one O(n) pass; then every range query is one
subtraction, O(1). The extra `p[0] = 0` lets a range starting at 0 use
the same formula.
