---
id: linear-variable-window-trace
kind: trace
version: 2
level: 2
tags: [sliding-window, tracing]
requires:
  - linear-variable-window-worked
  - interview-essentials/linear-variable-window-shrink
probes:
  1: { lo: "1", sum: "3" }
  2: { sum: "6", best: "3" }
elaborate: Why does this window need non-negative values, and what breaks if one element is negative?
refs:
  - https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
---

The longest run of consecutive elements whose sum is at most 6. The
window is `a[lo..hi]`; all values are non-negative. The first two
elements are already in.

```cpp
int a[] = {5, 1, 2, 3};
int lo = 0, sum = 6, best = 2;   // window {5, 1} so far

void extend(int hi) {
  sum += a[hi];                                 // a[hi] enters
  while (sum > 6) { sum -= a[lo]; ++lo; }       // shrink from the left
  if (hi - lo + 1 > best) best = hi - lo + 1;
}

int main() {
  extend(2);   // @1
  extend(3);   // @2
}
```

---

Adding 2 makes the sum 8, so the 5 leaves and shrinking stops at
`{1, 2}`, sum 3. Then 3 enters: `{1, 2, 3}` sums to 6, fits, and its
length 3 beats `best`. Dropping the 5 is what made the longer window
possible. **Each index enters once and leaves at most once**, so the
inner `while` runs at most n times in total: O(n).

(Values from running it under GCC 16.2.)
