---
id: search-binary-search-trace
kind: trace
version: 2
level: 1
tags: [binary-search, tracing]
requires:
  - interview-essentials/search-half-open-worked
  - interview-essentials/search-binary-search-halving
probes:
  1: { lo: "3", hi: "5" }
  2: { lo: "3", hi: "4" }
  3: { lo: "3", hi: "3" }
elaborate: Say in one sentence, as to an interviewer, why `hi = mid` here cannot loop forever.
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

The answer lies in `[lo, hi)`; each `step()` halves it.

```cpp
int a[] = {3, 8, 15, 23, 42};   // sorted
int key = 23, lo = 0, hi = 5;

void step() {
  int mid = lo + (hi - lo) / 2;
  if (a[mid] < key) lo = mid + 1;   // mid and everything left are too small
  else hi = mid;                    // mid may be the answer: keep it
}

int main() {
  step();   // @1
  step();   // @2
  step();   // @3
}
```

---

Probe 1: `mid = 2`, `15 < 23`, so the left part goes. Probe 2: `mid = 4`,
`42 ≥ 23`, so `hi` drops to 4. Probe 3: `mid = 3`, `23 ≥ 23`, so `hi = 3`
and the range is empty: `lo == hi == 3`, and `a[3]` is the key.

The range shrinks every step because `lo` moves *past* `mid` and `hi`
moves *to* it, so five elements take at most three steps.

(Values from running it under GCC 16.2.)
