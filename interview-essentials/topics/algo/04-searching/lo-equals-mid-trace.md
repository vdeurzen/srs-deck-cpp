---
id: search-lo-equals-mid-trace
kind: trace
version: 1
level: 2
tags: [binary-search, invariants, tracing]
requires:
  - search-half-open-invariant
probes:
  1: { lo: "2", hi: "4" }
  2: { lo: "2", hi: "3" }
  3: { lo: "2", hi: "3" }
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

A binary search with one changed line. The loop would call `step()`
while `lo < hi`.

```cpp
int a[] = {2, 5, 8, 12};
int key = 12, lo = 0, hi = 4;

void step() {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] < key) lo = mid;   // was: lo = mid + 1
  else hi = mid;
}

int main() {
  step();   // @1
  step();   // @2
  step();   // @3
}
```

---

Once `hi == lo + 1`, `mid` rounds down to `lo`, and `lo = mid` changes
nothing: **the range stops shrinking and the loop never ends.**

`a[mid] < key` proves `mid` is too small, so the invariant allows moving
past it; `lo = mid + 1` is what guarantees progress on every step.

(Values from running it under GCC 16.2.)
