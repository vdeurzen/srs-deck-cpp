---
id: linear-variable-window-shrink
kind: basic
version: 1
level: 2
tags: [sliding-window, arrays]
requires:
  - linear-sliding-window-sum
elaborate: "Why does this argument fail once negative values are allowed, and what would you reach for instead?"
refs:
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
---

## Longest run of non-negative values with sum ≤ 8. The window `{4, 1, 2}` (sum 7) takes in 6 and sums to 13. Why may the 4 be dropped for good?

```cpp
// a = {4, 1, 2, 6, ...}   window a[lo..hi], lo at the 4
```

---

**Any later window that starts at the 4 contains `{4, 1, 2, 6}`, already over 8.**

Values are non-negative, so extending to the right never lowers the
sum. So `lo` never moves back, and the whole scan stays O(n).
