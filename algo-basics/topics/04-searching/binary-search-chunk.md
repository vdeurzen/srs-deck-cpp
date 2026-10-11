---
id: search-binary-search-chunk
kind: chunk
version: 1
level: 1
tags: [foundations, binary-search]
requires:
  - search-linear-scan-cost
expose_ms: 10000
compile: null
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Procedure
  - https://en.cppreference.com/w/cpp/algorithm/binary_search
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

---

**Binary search over a sorted array, closed-range form**: the candidates
are `a[lo..hi]`, both ends included. Line by line: start with every
index; loop while a candidate is left; probe the middle (written so
`lo + hi` cannot overflow); stop on a hit; otherwise drop `mid` and the
half on the wrong side of it, which the sorted order proves cannot hold
the key; an empty range means absent.

Graded by text (`compile: null`): the snippet is a function body, and
the harness can only be appended after it.
