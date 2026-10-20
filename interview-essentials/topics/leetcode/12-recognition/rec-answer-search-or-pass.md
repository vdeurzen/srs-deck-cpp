---
id: rec-answer-search-or-pass
kind: basic
version: 1
level: 3
tags: [recognition, lc-875, lc-1011]
requires:
  - search-on-answer-monotone
  - technique-greedy-vs-dp
refs:
  - https://leetcode.com/problems/koko-eating-bananas/
  - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
elaborate: Name a tuning knob in a system you know, such as a batch size or a thread count, whose smallest workable value you could find the same way.
---

> (a) Packages with weights `w` ship in their given order, and each
> day's load may not exceed capacity `C`. Return the number of days
> needed.
>
> (b) Pile `i` holds `piles[i]` bananas. Each hour you eat up to `k`
> bananas from one pile. Return the smallest integer `k` that finishes
> every pile within `h` hours.
>
> Both: `n <= 10^4`, every value `<= 10^9`.

## One of them is answered by a single pass over the input. Which one needs a binary search over candidate answers instead?

---

**(b): it asks for the smallest `k` passing a test that every larger `k` passes.**

(a) fills each day until the next package would not fit: one pass. In
(b), one pass checks any `k` (the hours are each pile divided by `k`,
rounded up, summed), so binary-search `k` between 1 and the largest pile.
