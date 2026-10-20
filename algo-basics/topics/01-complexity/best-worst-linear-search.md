---
id: complexity-best-worst-linear-search
kind: basic
version: 2
level: 1
tags: [complexity, best-worst-average]
requires:
  - interview-essentials/complexity-count-loop-steps
  - interview-essentials/complexity-cost-cases
elaborate: When you give an O bound for a search in an interview, how do you say which case it describes?
refs:
  - https://en.wikipedia.org/wiki/Linear_search
---

```cpp
int find(const int* a, int n, int key) {
  for (int i = 0; i < n; ++i)
    if (a[i] == key) return i;   // one comparison
  return -1;
}
```

## On `a = {7, 3, 9, 1, 8}` (n = 5), which keys make `find` do all 5 comparisons?

---

**The last element, 8, and every key that is absent.**

Best case: the key is first, 1 comparison. Worst case: the key is last
*or missing*, n comparisons. Best, worst and average are three different
functions of n, so a bound must say which one it describes.
