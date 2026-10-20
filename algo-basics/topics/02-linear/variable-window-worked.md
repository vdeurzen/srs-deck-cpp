---
id: linear-variable-window-worked
kind: basic
version: 1
level: 2
tags: [sliding-window, worked-example]
requires:
  - interview-essentials/linear-variable-window-shrink
refs:
  - https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
---

## The longest run of consecutive elements of `a = {3, 1, 4, 2}` with sum at most 5. The window is `a[lo..hi]`:

```cpp
void extend(int hi) {
  sum += a[hi];                                 // a[hi] enters
  while (sum > 5) { sum -= a[lo]; ++lo; }       // shrink from the left
  if (hi - lo + 1 > best) best = hi - lo + 1;
}
```

| hi | sum after `+=` | shrink | window | best |
|---|---|---|---|---|
| 0 | 3 | — | {3} | 1 |
| 1 | 4 | — | {3, 1} | 2 |
| 2 | 8 | drop 3: sum 5 | {1, 4} | 2 |
| 3 | 7 | drop 1, 4: sum 2 | {2} | 2 |

At hi = 2, why is the length compared with `best` only after the 3 is dropped?

---

**With the 3 in it the sum is 8, over 5: not a valid window.**

A longest-window search shrinks until the window fits again and only
then records its length, so `best` only ever counts fitting windows.
Each element enters once and leaves at most once: O(n) in total.
