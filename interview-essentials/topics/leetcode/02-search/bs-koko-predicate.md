---
id: bs-koko-predicate
kind: basic
version: 1
level: 3
tags: [binary-search, search-on-answer, lc-875]
requires:
  - search-on-answer-monotone
refs:
  - https://leetcode.com/problems/koko-eating-bananas/
  - https://cp-algorithms.com/num_methods/binary_search.html
elaborate: Split Array Largest Sum (LC 410) splits `nums` into `k` contiguous parts, minimising the largest part's sum. What does its yes/no test check, and between which two values do you search?
---

Koko Eating Bananas (LC 875): find the smallest integer speed `v` that
eats every pile within `h` hours. Each hour she eats up to `v` bananas
from one pile, and the rest of that hour is wasted if the pile runs out.

```text
piles = 3 6 7 11,  h = 8
```

## A binary search over speeds needs a yes/no test `ok(v)`. What does it compute?

---

**Whether the hours ⌈p / v⌉, summed over the piles, are at most `h`.**

A pile of `p` takes ⌈p / v⌉ hours. Faster never takes longer, so `ok`
reads false … true over speeds 1 to the largest pile. Here `ok(4)` gives
1 + 2 + 2 + 3 = 8 hours: the answer is 4.
