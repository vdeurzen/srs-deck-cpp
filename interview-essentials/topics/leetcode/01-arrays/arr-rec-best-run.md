---
id: arr-rec-best-run
kind: basic
version: 1
level: 3
tags: [arrays, recognition, mixed]
requires:
  - arr-max-subarray-signal
  - linear-sliding-window-sum
refs:
  - https://leetcode.com/problems/maximum-subarray/
  - https://leetcode.com/problems/maximum-average-subarray-i/
elaborate: Say aloud which one word in a statement like this you would change to make the other pattern the right one.
---

> A shop logs its net cash flow for each day, `flow[i]`, positive or
> negative. Return the largest total over any run of consecutive days.
> `1 <= n <= 10^5`.

## Which pattern solves it?

---

**Kadane's algorithm: the run may have any length, and negative days are allowed.**

At each day keep the best total of a run ending there: extend it or
restart. A fixed-size sliding window would fit only if the run's length
were given, such as "exactly 7 consecutive days".
