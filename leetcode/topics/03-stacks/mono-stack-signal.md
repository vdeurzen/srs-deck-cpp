---
id: mono-stack-signal
kind: basic
version: 1
level: 2
tags: [monotonic-stack, stacks, recognition, lc-739]
requires:
  - algo-basics/linear-stack-recognition
refs:
  - https://leetcode.com/problems/daily-temperatures/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: Stock span (LC 901) looks backwards, not forwards. Which way do the stack's values run there?
---

> Given daily temperatures, return for each day the number of days you
> have to wait until a warmer temperature. If there is none, 0.
> `1 <= n <= 10^5`.

## Which O(n) pattern fits this statement?

---

**Monotonic stack of days still waiting; temperatures never rise from bottom to top.**

A new day pops and answers every cooler day on top. Each index is
pushed and popped once: O(n). Signals: *next* or *previous greater* /
*smaller*. Foil: a sliding-window maximum also expires elements from
the front, so it needs a deque.
