---
id: bit-explain-mask-subsets
kind: explain
version: 1
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
- [ ] Cue: n is small, at most about 20, and every subset of the items must be tried
- [ ] Pattern: count a mask from 0 to 2ⁿ − 1; bit i set means item i is in the subset
- [ ] Example: Sum of All Subset XOR Totals, the sum of the XOR of every subset
- [ ] Cost: O(n · 2ⁿ): 2ⁿ masks, n bit tests each
- [ ] Look-alike: backtracking lists the same subsets but can abandon a branch early; masks always visit all 2ⁿ
