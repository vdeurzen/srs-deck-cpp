---
id: linear-sliding-window-sum
kind: basic
version: 1
level: 1
tags: [sliding-window, arrays]
requires:
  - complexity-big-o-scaling
elaborate: "Where else does 'add the newcomer, drop the leaver' keep a running figure, such as a moving average or a rate limiter?"
refs:
  - https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
---

## You need the sum of every window of k consecutive elements, with n = 10⁵ and k = 5 · 10⁴. Re-adding each window from scratch costs about 2.5 · 10⁹ additions. What can each step do to the previous window's sum instead?

```cpp
// a = {5, 2, 7, 1, 4}, k = 3:  windows {5,2,7} {2,7,1} {7,1,4}
```

---

**Adds the element entering on the right, subtracts the one leaving on the left.**

`{5,2,7}` sums to 14; sliding one step gives 14 + 1 − 5 = 10 for
`{2,7,1}`. Neighbouring windows share k − 1 elements, so re-adding them
wastes O(k) per window; the update is O(1).
