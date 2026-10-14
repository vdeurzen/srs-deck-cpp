---
id: arr-diff-signal
kind: basic
version: 1
level: 2
tags: [difference-array, prefix-sums, recognition, lc-1109]
requires:
  - algo-basics/linear-prefix-sum-range
refs:
  - https://leetcode.com/problems/corporate-flight-bookings/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
elaborate: LC 1094 (car pooling) only asks whether some stop ever exceeds capacity. How does the same array answer that?
---

> There are `n` flights labeled 1 to `n`. `bookings[i] = [first, last, seats]`
> reserves `seats` on every flight from `first` through `last`.
> Return the total seats reserved on each flight.
> `n, bookings.length <= 2 * 10^4`.

## How do you get O(n + bookings) instead of touching every flight in every range?

---

**Difference array: `+seats` at `first`, `−seats` after `last`, then one prefix sum.**

Each booking costs O(1); the final running sum adds every booking to
exactly the flights inside it. It is prefix sums run backwards: build the
differences, then integrate once.
