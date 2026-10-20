---
id: arr-window-min-worked
kind: basic
version: 2
level: 3
tags: [sliding-window, lc-76, worked-example]
requires:
  - linear-variable-window-shrink
refs:
  - https://leetcode.com/problems/minimum-window-substring/
---

Minimum Window Substring: the shortest substring of `s` containing
every letter of `t`. The sliding window for `s = "bab"`, `t = "ab"`:

```
hi  window   holds a, b     action
0   b        no             grow
1   ba       yes            record 2; drop b
2   ab       yes            2 not shorter; drop a
```

## At `hi = 1`, why is the length recorded before `b` is dropped, not after?

---

**Dropping `b` breaks the window, so only before the drop is it valid to record.**
A shortest-window search records inside the shrink loop, each time the
window is still valid, then shrinks to try a shorter one. Recording
after the loop sees only broken windows: here it never records `"ba"`.
