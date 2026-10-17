---
id: linear-two-pointers-sorted-pair
kind: basic
version: 1
level: 1
tags: [two-pointers, arrays]
refs:
  - https://en.wikipedia.org/wiki/3SUM
---

## Find two elements of a sorted array that sum to 13. With `lo` at the smallest and `hi` at the largest, `a[lo] + a[hi]` is 12. Why is it safe to discard `a[lo]` for good?

```cpp
int a[] = {1, 3, 4, 6, 9, 11};   // a[lo] = 1, a[hi] = 11
```

---

**Its largest possible partner, `a[hi]`, already gives too small a sum.**
Every other partner left is ≤ `a[hi]`, so no pair with 1 can reach 13.

Each step discards one end, so the scan takes at most n steps: O(n)
instead of trying all n² pairs. Sortedness is what makes one comparison
rule out a whole row of pairs.
