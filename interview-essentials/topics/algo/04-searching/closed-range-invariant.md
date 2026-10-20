---
id: search-closed-range-invariant
kind: cloze
version: 2
level: 2
tags: [foundations, binary-search, invariants]
requires:
  - search-closed-range-worked
  - technique-loop-invariant-sum
elaborate: "Say aloud, as to an interviewer, what this loop promises about `a[lo..hi]` on every pass."
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

The loop invariant: in the sorted array `a`, if `key` occurs at all, it
occurs in `a[lo..hi]` with both ends {{c1::included::inclusive or exclusive?}}.

---

That is why the loop runs while `lo <= hi` (one candidate is still a
candidate) and why `lo = mid + 1` skips the `a[mid]` just tested. When
`lo > hi` the slice is empty, so `return -1` is correct.
