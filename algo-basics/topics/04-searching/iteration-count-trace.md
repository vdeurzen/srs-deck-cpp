---
id: search-iteration-count-trace
kind: basic
version: 2
level: 2
tags: [foundations, binary-search, complexity]
elaborate: The count is ⌊log₂ n⌋ + 1. How many iterations for a million elements, and why does it grow only at powers of two?
requires:
  - interview-essentials/search-binary-search-halving
  - interview-essentials/complexity-log-halvings
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Performance
---

A closed-range binary search (both ends of `a[lo..hi]` included) for a
key **larger than every element**, so each comparison says "too small" and only `lo` moves:

```cpp
int lo = 0, hi = n - 1;
while (lo <= hi) {
  int mid = lo + (hi - lo) / 2;
  lo = mid + 1;              // a[mid] < key every time
}
```

## Over 7 elements it loops 3 times. How many times does it loop over 8?

---

**4: the candidates go 8 → 4 → 2 → 1 → 0.**

Each pass keeps half the candidates, rounded down. 7 → 3 → 1 → 0 takes
3, but 8 is a power of two, so one more halving fits. No key makes
it loop more.
