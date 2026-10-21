---
id: mono-next-greater-worked
kind: basic
version: 1
level: 2
tags: [monotonic-stack, stacks, worked-example]
requires:
  - mono-stack-signal
refs:
  - https://leetcode.com/problems/daily-temperatures/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
---

For each day, how many days until a warmer one (0 if none), on
temperatures `73 71 72 75`. The stack holds indices of days still
waiting. Day `i` pops every waiting day cooler than itself, answering
each with `i` minus its index, then pushes `i`.

```text
i  t[i]  pops (answer)         stack after   answers
0  73    —                     0             0 0 0 0
1  71    —                     0 1           0 0 0 0
2  72    day 1 (1)             0 2           0 1 0 0
3  75    day 2 (1), day 0 (3)  3             3 1 1 0
```

## At `i = 2`, why does popping stop at day 0?

---

**73 is not cooler than 72, so day 0 keeps waiting.**

Temperatures on the stack never rise from bottom to top, so everything
below a day at least as warm as `t[i]` is at least as warm too: no
deeper day could be answered. Day 3's 75 later beats both.
