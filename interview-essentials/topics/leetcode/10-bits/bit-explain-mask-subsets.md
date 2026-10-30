---
id: bit-explain-mask-subsets
kind: explain
version: 2
level: 3
tags: [recognition, lc-1863, lc-78]
requires:
  - bits-mask-as-set
  - bit-mask-enumerate-code
  - complexity-feasible-n
  - bt-subsets-chunk
refs:
  - https://leetcode.com/problems/sum-of-all-subset-xor-totals/
  - https://leetcode.com/problems/subsets/
  - https://en.cppreference.com/w/cpp/language/operator_arithmetic
elaborate: Where else does a small set fit in one integer, such as feature flags or permission bits, and what does a loop over every mask then mean there?
---
An interviewer asks how you recognise, from a problem statement, that
it calls for enumerating subsets as bitmasks. Answer aloud.
---
- [ ] Every subset of the items must be tried, for example to total or test something over each one
- [ ] n is small, at most about 20: 2²⁰ is about a million subsets, which fits the time budget
- [ ] Count a mask from 0 to 2ⁿ − 1; bit i set means item i is in that subset
- [ ] It costs O(n · 2ⁿ): 2ⁿ masks with n bit tests each
- [ ] Backtracking lists the same subsets but can abandon a branch early; masks always visit all 2ⁿ
