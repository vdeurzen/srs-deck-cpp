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
- [ ] It asks for a contiguous subarray or substring, and once a window breaks the rule every longer one does too
- [ ] The right edge adds one element per step; the left edge moves right until the window is valid again
- [ ] Longest substring with no repeated character fits: a window holding a repeat keeps it however far it grows
- [ ] That is O(n), because each edge moves right at most n times
- [ ] Subarray sum equals `k` with negatives does not: a sum can recover, so use prefix sums plus a hash map
