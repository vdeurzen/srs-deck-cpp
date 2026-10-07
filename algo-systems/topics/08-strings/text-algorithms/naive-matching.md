---
id: str-naive-matching
kind: basic
version: 1
level: 2
tags: [strings, scanning, complexity]
refs:
  - https://epubs.siam.org/doi/10.1137/0206024
  - https://en.wikipedia.org/wiki/String-searching_algorithm
elaborate: Where in your code does a `find` run inside a loop over many positions, and what text would make it quadratic?
---

## Give a text `t` and a pattern `p` that force this naive search to make m comparisons at every alignment.

```cpp
for (std::size_t i = 0; i + m <= n; ++i) {     // each alignment
  std::size_t j = 0;
  while (j < m && t[i + j] == p[j]) ++j;
  if (j == m) return i;
}
```

---

**`t = aaa…a`, `p = aa…ab`: every alignment matches m − 1 characters, then fails.**

After a mismatch the loop slides one position and compares again
characters it has already seen, so (n − m + 1)·m comparisons in the
worst case. Every faster matcher reuses what a failed alignment
revealed instead of throwing it away.
