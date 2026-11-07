---
id: rec-explain-windows
kind: explain
version: 3
level: 3
tags: [arrays, recognition, lc-3, lc-560]
requires:
  - arr-window-signal
  - arr-window-variable-chunk
  - arr-window-negatives
  - arr-prefix-hash-signal
refs:
  - https://leetcode.com/problems/longest-substring-without-repeating-characters/
  - https://leetcode.com/problems/subarray-sum-equals-k/
  - https://leetcode.com/problems/max-consecutive-ones-iii/
  - https://usaco.guide/silver/two-pointers
elaborate: Where else have you met a "stretch until it breaks, then shrink from the back" loop outside of interview problems, such as a rate limiter or a log scanner?
---
An interviewer asks how you tell, from a problem statement alone, that
a sliding window will solve it. Answer aloud.
---
- [ ] The statement asks for a contiguous run, and any window containing a rule-breaking window breaks the rule
- [ ] Longest substring with no repeated character fits: a window holding a repeat keeps it however far it grows
- [ ] Subarray sum equals `k` with negatives does not fit: a sum can recover, so use prefix sums
