---
id: arr-rec-busy-spans
kind: basic
version: 1
level: 3
tags: [arrays, recognition, mixed]
requires:
  - arr-intervals-merge-signal
  - arr-diff-signal
refs:
  - https://leetcode.com/problems/merge-intervals/
  - https://leetcode.com/problems/corporate-flight-bookings/
elaborate: Say aloud how the answer changes if the statement asked, for every hour of the day, how many reservations cover it.
---

> A room's reservations `[start, end]` arrive in any order and may
> overlap. Return the time spans during which the room is in use.
> `1 <= n <= 10^4`, times up to `10^9`.

## Which pattern solves it?

---

**Merge intervals: sort by start, then join each reservation to the last span or open one.**

The answer is a list of spans, not a count per time. A difference array
counts how many reservations cover each time, and it needs one cell
per time: up to 10⁹ here.
