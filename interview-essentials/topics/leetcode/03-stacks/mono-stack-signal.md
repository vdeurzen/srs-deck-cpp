---
id: mono-stack-signal
kind: basic
version: 1
level: 2
tags: [stacks, recognition, lc-739]
requires:
  - linear-stack-recognition
  - linear-deque-both-ends
refs:
  - https://leetcode.com/problems/daily-temperatures/
  - https://leetcode.com/problems/online-stock-span/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: Online Stock Span (LC 901) returns, for each new price, how many consecutive days up to today had a price at most today's. It looks backwards, not forwards. Which way do the stack's values run there?
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
