---
id: mono-histogram-worked
kind: basic
version: 2
level: 3
tags: [monotonic-stack, stacks, lc-84, worked-example]
requires:
  - mono-histogram-bounds
refs:
  - https://leetcode.com/problems/largest-rectangle-in-histogram/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
---

Largest Rectangle in Histogram, heights `2 3 1` plus a trailing
sentinel 0. Each bar pops every stacked bar at least as tall, scoring
`height × (i - left - 1)`; `left` is the index under the popped bar, or
−1 when the stack is empty.

```
i  h[i]  pops: height × width   stack after   best
0  2     —                      0             0
1  3     —                      0 1           0
2  1     3 × 1, then 2 × 2      2             4
3  0     1 × 3                  3             4
```

## At `i = 2`, why does bar 0 score width 2 when bar 1 scored only 1?

---

**Bar 1's pop left the stack empty under bar 0, so its `left` is −1.**
Width is `2 - (-1) - 1 = 2`: bar 0's rectangle of height 2 spans bars 0
and 1, since bar 1 (height 3) is taller. Bar 1's `left` was bar 0, so it
covered only itself.
