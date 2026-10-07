---
id: linear-variable-window-trace
kind: trace
version: 1
level: 2
tags: [sliding-window, tracing]
requires:
  - linear-variable-window-shrink
probes:
  1: { lo: "0", sum: "7", best: "3" }
  2: { lo: "2", sum: "8", best: "3" }
  3: { lo: "4", sum: "7", best: "4" }
refs:
  - https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
---

The longest run of consecutive elements whose sum is at most 8. The
window is `a[lo..hi]`; all values are non-negative.

```cpp
int a[] = {4, 1, 2, 6, 1, 1, 3, 2};
int lo = 0, sum = 0, best = 0;

void extend(int hi) {
  sum += a[hi];                          // a[hi] enters
  while (sum > 8) sum -= a[lo++];        // shrink from the left until it fits
  if (hi - lo + 1 > best) best = hi - lo + 1;
}

int main() {
  extend(0); extend(1); extend(2);               // @1
  extend(3);                                     // @2
  extend(4); extend(5); extend(6); extend(7);    // @3
}
```

---

Adding 6 makes the sum 13, so 4 and 1 leave and shrinking stops at
`{2, 6}`, sum 8, which fits. **Each index enters once and leaves at most
once**, so the inner `while` runs at most n times in total: O(n), even
though it is a loop inside a loop.

(Values from running it under GCC 16.2.)
