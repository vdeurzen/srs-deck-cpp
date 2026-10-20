---
id: complexity-cost-explain-derive
kind: explain
version: 1
level: 2
tags: [foundations, complexity, capstone]
requires:
  - interview-essentials/complexity-cost-sum-rule
  - complexity-cost-trace-triangular
  - complexity-cost-trace-doubling
  - complexity-cost-trace-merge-recurrence
refs:
  - https://en.wikipedia.org/wiki/Analysis_of_algorithms
  - https://en.wikipedia.org/wiki/Recursion_tree
---

Derive how the cost of `f` grows with n, part by part, and say which
part decides it.

```cpp
int fold(const int* a, int lo, int hi) {      // works on a[lo, hi)
  if (hi - lo <= 1) return 0;
  int mid = (lo + hi) / 2;
  int r = fold(a, lo, mid) + fold(a, mid, hi);
  for (int i = lo; i < hi; ++i) r += a[i];
  return r;
}
int f(const int* a, int n) {
  int hits = 0;
  for (int i = 0; i < n; ++i)
    for (int j = 0; j < i; ++j)
      if (a[i] == a[j]) ++hits;
  for (int w = 1; w < n; w *= 2) ++hits;
  return hits + fold(a, 0, n);
}
```

---

- [ ] The three parts of `f` run one after another, so their costs add and the fastest-growing one decides
- [ ] The pair loop's inner count is i, so it is 0 + 1 + … + (n − 1) = n(n − 1)/2, quadratic, not n·n
- [ ] The doubling loop runs about log₂ n passes, since w multiplies by 2 until it reaches n
- [ ] `fold` is T(n) = 2T(n/2) + n: log₂ n levels × n work per level = n log n
- [ ] The total grows like n²: the pair loop dominates the sum
