---
id: search-explain-binary-correct
kind: explain
version: 1
level: 2
tags: [foundations, binary-search, invariants, capstone]
requires:
  - interview-essentials/search-closed-range-invariant
  - search-iteration-count-trace
  - technique-termination-measure
elaborate: What would break if the update were `lo = mid` instead of `lo = mid + 1`, and which input shows it?
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
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

A colleague doubts this search. Convince them that it is correct, and
fast on a million elements.
---
- [ ] `a` must be sorted; on unsorted input dropping a half can drop the key
- [ ] If the key is present it stays in `a[lo..hi]`: sorted order proves each dropped part cannot hold it
- [ ] `mid` is always excluded from the next range, so `hi − lo` falls every iteration and the loop stops
- [ ] At exit `lo > hi`, an empty slice, so by that invariant the key is absent: -1 is right
- [ ] The range at least halves each time: at most ⌊log₂ n⌋ + 1 iterations, 20 for a million
