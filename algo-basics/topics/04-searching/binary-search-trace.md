---
id: search-binary-search-trace
kind: trace
version: 1
level: 1
tags: [binary-search, tracing]
requires:
  - search-binary-search-halving
probes:
  1: { lo: "5", hi: "8" }
  2: { lo: "5", hi: "6" }
  3: { lo: "5", hi: "5" }
refs:
  - https://en.wikipedia.org/wiki/Binary_search_algorithm
---

The answer lies in `[lo, hi)`; each `step()` halves it.

```cpp
int a[] = {3, 8, 15, 23, 42, 57, 61, 90};   // sorted
int key = 57, lo = 0, hi = 8;

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

Probe 1: `mid = 4`, `42 < 57`, so the left half goes. Probe 2: `mid = 6`,
`61 ≥ 57`, so `hi` drops to 6. Probe 3: `mid = 5`, `57 ≥ 57`, so `hi = 5`
and the range is empty: `lo == hi == 5`, and `a[5]` is the key.

The range shrinks every step because `lo` moves *past* `mid` and `hi`
moves *to* it. Eight elements take three or four steps, at most
⌊log₂ 8⌋ + 1 = 4 (a key below `a[0]` needs four).

(Values from running it under GCC 16.2.)
