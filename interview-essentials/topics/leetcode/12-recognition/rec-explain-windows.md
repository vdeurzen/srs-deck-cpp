---
id: rec-explain-windows
kind: explain
version: 2
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
- [ ] Cue: a contiguous subarray or substring, and once a window breaks the rule every longer one does too
- [ ] Pattern: `hi` adds one element per step; `lo` moves right until the window is valid again
- [ ] Example: longest substring of `s` with no repeated character
- [ ] Cost: O(n), because `lo` and `hi` each move right at most n times
- [ ] Look-alike: subarray sum equals `k` with negatives; a sum can recover, so use prefix sums plus a hash map
