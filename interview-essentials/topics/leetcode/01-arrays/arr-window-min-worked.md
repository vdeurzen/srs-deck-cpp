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
—   (empty)  —              init: lo = 0
0   b        no             expand
1   ba       yes            expand; record 2; shrink, dropping b
2   ab       yes            expand; 2 not shorter; shrink
```

## At `hi = 1`, why is the length recorded before `b` is dropped, not after?

---

**Dropping `b` breaks the window, so only before the drop is it valid to record.**
A shortest-window search runs init, then per `hi`: expand, then record
and shrink while the window is valid. Recording after the shrink loop
sees only broken windows: here it never records `"ba"`.
