---
id: arr-window-variable-chunk
kind: chunk
version: 1
level: 2
tags: [sliding-window, arrays, lc-3, lc-76]
expose_ms: 9000
compile: null # a function body: graded by text, see below
requires:
  - algo-basics/linear-variable-window-shrink
refs:
  - https://leetcode.com/problems/longest-substring-without-repeating-characters/
  - https://leetcode.com/problems/minimum-window-substring/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
elaborate: LC 76 wants the shortest valid window. Where does the `best` line move, and why?
---

```cpp
int cnt[128]{}, lo = 0, best = 0;
for (int hi = 0; hi < int(s.size()); ++hi) {
  ++cnt[s[hi]];
  while (cnt[s[hi]] > 1) --cnt[s[lo++]];
  best = std::max(best, hi - lo + 1);
}
return best;
```

---

**Variable sliding window** (LC 3, longest substring without repeating
characters). `s[hi]` enters; `lo` moves right until `s[lo..hi]` is valid
again; the valid window is then measured.

`while`, not `if`: in `"abcb"` the repeated `b` is two steps back, so
one step is not enough. `lo` and `hi` only move right: O(n).

For a *shortest* valid window (LC 76) the shape flips: record inside the
`while`, while the window is still valid, then shrink.

Graded by text (`compile: null`): it is the body of
`int lengthOfLongestSubstring(std::string s)`, and a harness can only be
appended after it. Checked by including it verbatim in a constexpr test
of LC 3's examples, GCC 16.2; `-Wall` warns about the `char` subscript,
harmless for LC 3's ASCII input.
