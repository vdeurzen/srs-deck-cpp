---
id: search-closed-range-invariant
kind: cloze
version: 1
level: 2
tags: [foundations, binary-search, invariants]
requires:
  - search-binary-search-chunk
  - technique-max-invariant-code
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure
---

```cpp
int lo = 0, hi = n - 1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] == key) return mid;
  if (a[mid] < key) lo = mid + 1; else hi = mid - 1;
}
return -1;
```

In the sorted array `a`, if `key` occurs at all, it occurs in
`a[lo..hi]` with both ends {{c1::included::inclusive or exclusive?}}. When
`a[mid] < key`, everything in `a[0..mid]` is {{c2::smaller than `key`::compare with the key}},
so `lo = mid + 1` keeps that true. When `lo > hi` the slice is empty,
so `return -1` is correct.

---

Example: `a = {2, 5, 8, 12, 17}`, `key = 12`. `mid = 2`, `8 < 12`: the
key, if present, is in `a[3..4]`. `mid = 3`: found. Every update throws
away only what the sorted order proves cannot match.
