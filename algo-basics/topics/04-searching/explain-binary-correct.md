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

Convince a colleague that this search never misses a present key,
always stops, and say how many iterations it can take on a million
elements.
---
- [ ] Precondition: `a` is sorted; on unsorted input dropping a half can drop the key
- [ ] Invariant: if the key is present it lies in `a[lo..hi]`, and each update keeps that because sorted order proves the dropped part cannot match
- [ ] It stops: `mid` is always excluded, so `hi − lo` falls every iteration
- [ ] At exit `lo > hi`: the slice is empty, so by the invariant the key is absent and -1 is right
- [ ] The range at least halves each time: at most ⌊log₂ n⌋ + 1 iterations, 20 for a million
