---
id: mono-histogram-bounds
kind: basic
version: 1
level: 3
tags: [monotonic-stack, stacks, lc-84]
requires:
  - mono-next-greater-chunk
refs:
  - https://leetcode.com/problems/largest-rectangle-in-histogram/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: The stack gives each bar its nearest lower bar on both sides in one pass. Where else would "nearest smaller on each side" answer a problem?
---

LC 84: `st` holds bar indices, heights rising from bottom to top. Bar
`i` is lower than the top bar `b`, so `b` is popped:

```cpp
int b = st.back();
st.pop_back();
int left = st.back();   // or -1 if st is now empty
```

## How wide is the largest rectangle of height `h[b]`?

---

**`i - left - 1`: `i` is the first lower bar on the right, `left` the last lower on the left.**

Every bar strictly between them is at least `h[b]` tall: those right of
`b` were popped before it, those left of it were popped by `b` or
earlier. With nothing lower on the left, `left` is -1.
