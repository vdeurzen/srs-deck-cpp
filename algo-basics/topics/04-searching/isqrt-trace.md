---
id: search-isqrt-trace
kind: trace
version: 2
level: 3
tags: [binary-search, search-on-answer, tracing]
requires:
  - interview-essentials/search-half-open-worked
  - interview-essentials/search-on-answer-monotone
probes:
  1: { lo: "0", hi: "5" }
  2: { lo: "3", hi: "4" }
  3: { lo: "4", hi: "4" }
elaborate: Name another quantity you could find this way, by binary searching a yes/no test instead of an array.
refs:
  - https://en.wikipedia.org/wiki/Integer_square_root
---

The integer square root of 10 by searching on the answer: find the first
`x` in `[0, 11)` with `x * x > n`, then subtract one.

```cpp
int n = 10, lo = 0, hi = 11;

void step() {
  int mid = lo + (hi - lo) / 2;
  if (mid * mid <= n) lo = mid + 1;   // mid is not yet too big
  else hi = mid;
}

int main() {
  step();           // @1
  step(); step();   // @2
  step();           // @3
}
```

---

Midpoints 5, 2, 4, 3. `x * x > 10` is false up to 3 and true from 4 on,
so the search ends at 4, and √10 rounded down is 3. **The predicate replaces the
array**: same loop, same invariant, about log₂ 11 steps.

(Values from running it under GCC 16.2.)
