---
id: rec-min-max-vs-min-sum
kind: basic
version: 1
level: 4
tags: [binary-search, search-on-answer, dynamic-programming, recognition, lc-410, lc-1335]
requires:
  - interview-essentials/search-on-answer-monotone
  - interview-essentials/technique-dp-state
refs:
  - https://leetcode.com/problems/split-array-largest-sum/
  - https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule/
  - https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/
  - https://leetcode.com/problems/koko-eating-bananas/
  - https://cp-algorithms.com/num_methods/binary_search.html
elaborate: Capacity To Ship Packages Within D Days (LC 1011, the least ship capacity that carries `weights` in order within `days` days) and Koko Eating Bananas (LC 875, the least hourly rate that eats all `piles` within `h` hours, one pile per hour) also binary-search the least value that passes a test. What is the greedy check `ok(x)` in each?
---

Both cut an array into `k` contiguous, non-empty pieces in order.

> (a) Minimise the largest sum of any piece.
>
> (b) A piece's difficulty is its largest element. Minimise the sum of
> the pieces' difficulties.

## Only one of them can use binary search on the answer. What does the other lack?

---

**A cheap yes/no test: (b)'s "total ≤ x" is monotone in x, but testing it is the whole problem.**

(a) tests "every piece ≤ x" greedily in O(n): cut when the next element
would push the piece past `x`. In (b) pieces trade against each other,
so checking one `x` already needs the DP over (elements used, pieces
cut).
