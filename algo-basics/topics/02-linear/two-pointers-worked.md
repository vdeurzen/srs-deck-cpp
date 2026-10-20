---
id: linear-two-pointers-worked
kind: basic
version: 1
level: 2
tags: [two-pointers, worked-example]
requires:
  - interview-essentials/linear-two-pointers-sorted-pair
refs:
  - https://en.wikipedia.org/wiki/3SUM
---

## Looking for two elements of the sorted `a = {2, 4, 5, 8}` that sum to 9:

```cpp
int lo = 0, hi = 3;
while (lo < hi) {
  int s = a[lo] + a[hi];
  if (s == 9) break;              // found
  if (s < 9) ++lo; else --hi;
}
```

| lo | hi | sum | vs 9 | move |
|---|---|---|---|---|
| 0 | 3 | 2 + 8 = 10 | too big | hi = 2 |
| 0 | 2 | 2 + 5 = 7 | too small | lo = 1 |
| 1 | 2 | 4 + 5 = 9 | equal | found |

Why does row 1 drop the 8 for good, rather than the 2?

---

**Even 8's smallest partner, 2, overshoots 9, so no pair with 8 fits.**

Every other partner of 8 is larger than 2, so every sum with 8 is over
9. The 2 may still meet a partner smaller than 8, so it stays. Each row
drops one element.
