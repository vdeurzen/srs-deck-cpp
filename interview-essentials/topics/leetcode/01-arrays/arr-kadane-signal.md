---
id: arr-kadane-signal
kind: basic
version: 1
level: 3
tags: [arrays, recognition, lc-121, lc-53]
requires:
  - arr-kadane-all-negative
refs:
  - https://leetcode.com/problems/best-time-to-buy-and-sell-stock/
  - https://leetcode.com/problems/maximum-subarray/
  - https://doi.org/10.1145/358234.381162
elaborate: The usual answer keeps the lowest price so far and records `p − low`. Which of Kadane's two running values is `p − low`?
---

> `prices[i]` is a stock's price on day `i`. Choose one day to buy and
> a later day to sell. Return the maximum profit; if you cannot make
> any, return 0.

## Which rewrite of `prices` reduces this to a classic array problem?

---

**Daily changes `d[i] = prices[i] − prices[i−1]`: the answer is d's maximum subarray sum, the empty one allowed.**

Buy on day `i`, sell on day `j`: profit `sum(d[i+1..j])`. No profit (0)
is the empty subarray, so resetting at 0 is right here, unlike in
Maximum Subarray. `{7, 1, 5, 3, 6, 4}` gives 5.
