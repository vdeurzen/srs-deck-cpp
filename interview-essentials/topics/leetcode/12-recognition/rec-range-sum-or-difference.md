---
id: rec-range-sum-or-difference
kind: basic
version: 1
level: 3
tags: [arrays, recognition, lc-303, lc-1109]
requires:
  - linear-prefix-sum-range
  - arr-diff-signal
refs:
  - https://leetcode.com/problems/range-sum-query-immutable/
  - https://leetcode.com/problems/corporate-flight-bookings/
elaborate: Where in a system you know do many writes each touch a whole range, such as a calendar's bookings, and when are they finally read?
---

> (a) Given a fixed array `nums`, answer `10^4` queries, each asking for
> the sum of `nums[l..r]`.
>
> (b) Start from `n` zeros. Apply `10^4` updates, each adding `v` to every
> element of `[l..r]`, then return the final array.
>
> Both: `n <= 10^5`.

## Prefix sums built once from the input answer only one of them. What property of the other rules them out?

---

**(b) writes its ranges instead of reading them, so up-front prefix sums go stale.**

In (a) the data is fixed, so `p[r + 1] − p[l]` answers each query. In
(b) every update changes the array; a difference array marks `+v` at
`l` and `−v` at `r + 1`, O(1) each, then one prefix sum rebuilds it.
