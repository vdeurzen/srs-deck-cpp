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

## `p[i]` holds the sum of the first `i` elements of `a`. How do you get the sum of `a[2..5)` without a loop?

```cpp
int a[] = {3, 1, 4, 1, 5, 9};
int p[] = {0, 3, 4, 8, 9, 14, 23};   // p[0] = 0, p[i+1] = p[i] + a[i]
```

---

**`p[5] - p[2]`: everything before 5 minus everything before 2.**
Here 14 − 4 = 10 = 4 + 1 + 5.

Building `p` is one O(n) pass; then every range query is one
subtraction, O(1). The extra `p[0] = 0` lets a range starting at 0 use
the same formula.
