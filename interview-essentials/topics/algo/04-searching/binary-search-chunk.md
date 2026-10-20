---
id: search-binary-search-chunk
kind: chunk
version: 1
level: 1
tags: [foundations, binary-search]
expose_ms: 12000
compile: null
requires:
  - search-closed-range-invariant
  - search-midpoint-overflow
elaborate: "Which line would you change so the loop finds the first element not less than `key`, instead of any match?"
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure
  - https://en.cppreference.com/w/cpp/algorithm/binary_search
---

`a` is a sorted array of `n` ints; this loop sits in a function that
returns `key`'s index, and returns −1 after the loop.

```cpp
int lo = 0, hi = n - 1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] == key) return mid;
  if (a[mid] < key) lo = mid + 1;
  else hi = mid - 1;
}
```

---

**Binary search over a sorted array, closed-range form**: the candidates
are `a[lo..hi]`, both ends included. **Init**: every index is a
candidate; loop while one is left. **Compute mid** so `lo + hi` cannot
overflow. **Compare**: stop on a hit. **Shrink**: drop `mid` and the half
the sorted order proves cannot hold the key. An empty range means the
key is absent, so `return -1` follows.
