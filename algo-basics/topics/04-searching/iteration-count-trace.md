---
id: search-iteration-count-trace
kind: trace
version: 1
level: 2
tags: [foundations, binary-search, complexity, tracing]
elaborate: The count is ⌊log₂ n⌋ + 1. How many iterations for a million elements, and why does it grow only at powers of two?
requires:
  - search-binary-search-chunk
probes:
  1: { c: "3" }
  2: { c: "4" }
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm#Performance
---

`steps(n)` counts loop iterations of a closed-range binary search over
n sorted elements for a key **larger than all of them**, so every
comparison says "too small" and only `lo` moves.

```cpp
int steps(int n) {
  int lo = 0, hi = n - 1, count = 0;
  while (lo <= hi) {
    int mid = lo + (hi - lo) / 2;
    lo = mid + 1;            // a[mid] < key every time
    ++count;
  }
  return count;
}

int main() {
  int c = steps(7);   // @1
  c = steps(8);       // @2
}
```

---

Each iteration leaves ⌊size/2⌋ candidates: 7 → 3 → 1 → 0 and
8 → 4 → 2 → 1 → 0. **One more element costs a whole extra iteration
here, because 8 is a power of two**; this key is a worst case, so no
search over 7 or 8 elements loops more.

(Values from running an instrumented copy under GCC 16.2.)
