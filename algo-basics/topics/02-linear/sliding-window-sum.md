---
id: linear-sliding-window-sum
kind: basic
version: 1
level: 1
tags: [sliding-window, arrays]
requires:
  - complexity-big-o-scaling
refs:
  - https://en.wikipedia.org/wiki/Moving_average#Simple_moving_average
---

## The sum of every window of k consecutive elements can be computed in O(n) total, not O(n·k). What does each step do to the previous window's sum?

```cpp
// a = {5, 2, 7, 1, 4}, k = 3:  windows {5,2,7} {2,7,1} {7,1,4}
```

---

**Adds the element entering on the right, subtracts the one leaving on the left.**

`{5,2,7}` sums to 14; sliding one step gives 14 + 1 − 5 = 10 for
`{2,7,1}`. Neighbouring windows share k − 1 elements, so re-adding them
wastes O(k) per window; the update is O(1).
