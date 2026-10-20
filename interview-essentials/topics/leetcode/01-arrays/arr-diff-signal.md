---
id: arr-diff-signal
kind: basic
version: 1
level: 2
tags: [arrays, recognition, lc-1109]
requires:
  - linear-prefix-sum-range
refs:
  - https://leetcode.com/problems/corporate-flight-bookings/
  - https://leetcode.com/problems/car-pooling/
  - https://cp-algorithms.com/data_structures/fenwick.html#2-range-update-and-point-query
elaborate: Car Pooling (LC 1094) gives trips `[passengers, from, to]` along one road and only asks whether the car's `capacity` is ever exceeded. How does the same array answer that?
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
