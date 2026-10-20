---
id: arr-window-variable-chunk
kind: chunk
version: 2
level: 2
tags: [sliding-window, arrays, lc-3, lc-76]
expose_ms: 12000
compile: null # a function body
requires:
  - linear-variable-window-shrink
  - cpp-essentials/string-basics
  - cpp-essentials/expr-increment-value
refs:
  - https://leetcode.com/problems/longest-substring-without-repeating-characters/
  - https://leetcode.com/problems/minimum-window-substring/
  - Cormen, Leiserson, Rivest, Stein, Introduction to Algorithms, 4th ed., ch. 16 (aggregate analysis)
elaborate: Minimum Window Substring (LC 76) wants the shortest window of `s` containing every letter of `t`. Where does the `best` line move, and why?
---

`s` is a `std::string` of length `n`; `cnt[c]` counts character `c` in
the window `s[lo..hi]` and starts all zero.

```cpp
int lo = 0, best = 0;
for (int hi = 0; hi < n; ++hi) {
  ++cnt[s[hi]];
  while (cnt[s[hi]] > 1) --cnt[s[lo++]];
  if (hi - lo + 1 > best) best = hi - lo + 1;
}
return best;
```

---

**Variable sliding window** (Longest Substring Without Repeating
Characters, LC 3: the length of the longest substring of `s` with no
repeated character). `s[hi]` enters; `lo` moves right until `s[lo..hi]`
is valid again; the valid window is then measured.

`while`, not `if`: in `"abcb"` the repeated `b` is two steps back, so
one step is not enough. `lo` and `hi` only move right: O(n).
