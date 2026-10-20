---
id: search-half-open-worked
kind: basic
version: 1
level: 2
tags: [binary-search, invariants, worked-example]
requires:
  - search-half-open-invariant
refs:
  - https://en.cppreference.com/w/cpp/algorithm/lower_bound
  - https://www.cs.utexas.edu/~EWD/ewd08xx/EWD831.PDF
---

## A half-open search for the first element not less than 7 in `a = {1, 4, 6, 9, 13}`:

```cpp
int lo = 0, hi = 5;
while (lo < hi) {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] < 7) lo = mid + 1; else hi = mid;
}
```

| lo | hi | mid | compare `a[mid] < 7` | shrink |
|---|---|---|---|---|
| 0 | 5 | 2 | 6: yes | lo = 3 |
| 3 | 5 | 4 | 13: no | hi = 4 |
| 3 | 4 | 3 | 9: no | hi = 3 |
| 3 | 3 | — | loop ends | answer: index 3 |

After the init line, each row computes mid, compares, shrinks. Why
does row 3 set `hi = 3` rather than `hi = 2`?

---

**9 fails `< 7`, so it joins `a[hi..n)`; `hi = 2` would wrongly add the 6.**

The invariant: `a[0..lo)` is less than 7, `a[hi..n)` is not. `hi = mid`
moves exactly the element just tested into the right-hand part, so when
`lo == hi` the boundary is the first element not less than 7.
