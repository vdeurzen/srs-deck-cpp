---
id: search-unsorted-input-trace
kind: trace
version: 1
level: 1
tags: [foundations, binary-search, tracing]
requires:
  - search-binary-search-chunk
probes:
  1: { lo: "3", hi: "4" }
  2: { lo: "4", hi: "4" }
  3: { lo: "5", hi: "4" }
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

One step of a closed-range binary search, run on an array that is
**not** sorted. The key, 9, is at index 1.

```cpp
int a[] = {4, 9, 1, 7, 3};
int key = 9, lo = 0, hi = 4;

void step() {   // called while lo <= hi
  int mid = lo + (hi - lo) / 2;
  if (a[mid] == key) return;   // found
  if (a[mid] < key) lo = mid + 1; else hi = mid - 1;
}

int main() {
  step();   // @1
  step();   // @2
  step();   // @3
}
```

---

Probe 1: `a[2] = 1 < 9`, so indices 0..2 are dropped, and the 9 at
index 1 with them. Probes 2 and 3 compare 7 and 3, both below 9, and
`lo` passes `hi`: the search reports "absent" for a key that is there.

Dropping a half is only sound when **the input is sorted**; that is the
precondition, not an optimisation.

(Values from running an instrumented copy under GCC 16.2.)
