---
id: linear-variable-window-shrink
kind: basic
version: 1
level: 2
tags: [sliding-window, arrays]
requires:
  - linear-sliding-window-sum
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
---

## Longest run of non-negative values with sum ≤ 8. The window `{4, 1, 2}` (sum 7) takes in 6 and sums to 13. Why may the 4 be dropped for good, rather than restarting the search?

```cpp
// a = {4, 1, 2, 6, ...}   window a[lo..hi], lo at the 4
```

---

**Any later window that starts at the 4 contains `{4, 1, 2, 6}`, already over 8.**

Values are non-negative, so extending to the right never lowers the
sum. So `lo` only moves right and `hi` only moves right: each index
enters and leaves once, O(n) in total.
