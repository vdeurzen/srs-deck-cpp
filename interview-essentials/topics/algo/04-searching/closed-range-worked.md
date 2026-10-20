---
id: search-closed-range-worked
kind: basic
version: 1
level: 2
tags: [binary-search, invariants, worked-example]
requires:
  - search-binary-search-halving
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure
---

## Binary search for 15 in the sorted `a = {3, 6, 9, 14, 20}`, keeping the candidates in `a[lo..hi]`, both ends included:

```cpp
int lo = 0, hi = 4;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] == 15) return mid;
  if (a[mid] < 15) lo = mid + 1; else hi = mid - 1;
}
return -1;
```

| step | lo | hi | mid, `a[mid]` | compare → shrink |
|---|---|---|---|---|
| 1 init | 0 | 4 | — | — |
| 2 | 0 | 4 | 2, 9 | 9 < 15 → lo = 3 |
| 3 | 3 | 4 | 3, 14 | 14 < 15 → lo = 4 |
| 4 | 4 | 4 | 4, 20 | 20 > 15 → hi = 3 |
| 5 end | 4 | 3 | — | lo > hi: return −1 |

Rows 2–4 each compute mid, compare, shrink. Why does row 2 set
`lo = 3`, not `lo = 2`?

---

**`a[2] = 9` was just ruled out, and `a[lo..hi]` holds only live candidates.**

Both ends of the range count as candidates, so `lo` must move past
`mid`. With `lo = mid` the range can stop shrinking: here `lo` would
stick at 3 once `hi = 4`, re-testing 14 forever.
