---
id: complexity-cost-trace-early-exit
kind: basic
version: 2
level: 1
tags: [foundations, complexity, best-worst-average]
requires:
  - complexity-cost-trace-triangular
elaborate: Where in your own code does an early return make the cost depend on the data, and which input is its worst case?
refs:
  - https://en.wikipedia.org/wiki/Best,_worst_and_average_case
---

```cpp
bool has_duplicate(const int* a, int n) {
  for (int i = 1; i < n; ++i)
    for (int j = 0; j < i; ++j)
      if (a[i] == a[j]) return true;   // one comparison
  return false;
}
```

## Called with n = 4, which input makes it compare most often: `{5, 5, 2, 8}`, `{5, 2, 8, 5}` or `{5, 2, 8, 1}`?

---

**`{5, 2, 8, 1}`, with no duplicate: all 6 pairs, 1 + 2 + 3.**

The early exit makes the cost depend on the input, not only on n:
`{5, 5, 2, 8}` stops after 1 comparison and `{5, 2, 8, 5}` after 4. The
loop shape fixes only the ceiling.
