---
id: search-isqrt-trace
kind: trace
version: 1
level: 3
tags: [binary-search, search-on-answer, tracing]
requires:
  - search-on-answer-monotone
probes:
  1: { lo: "0", hi: "10" }
  2: { lo: "6", hi: "8" }
  3: { lo: "7", hi: "7" }
refs:
  - https://en.wikipedia.org/wiki/Integer_square_root
---

The integer square root of 40 by searching on the answer: find the first
`x` in `[0, 41)` with `x * x > n`, then subtract one.

```cpp
int n = 40, lo = 0, hi = 41;

void step() {
  int mid = lo + (hi - lo) / 2;
  if (mid * mid <= n) lo = mid + 1;   // mid is not yet too big
  else hi = mid;
}

int main() {
  step(); step();   // @1
  step(); step();   // @2
  step(); step();   // @3
}
```

---

Midpoints 20, 10, 5, 8, 7, 6. `x * x > 40` is false up to 6 and true
from 7 on, so the search ends at 7 and ⌊√40⌋ = 6. **The predicate
replaces the array**: same loop, same invariant, ⌈log₂ 41⌉ = 6
steps.

(Values from running it under GCC 16.2.)
