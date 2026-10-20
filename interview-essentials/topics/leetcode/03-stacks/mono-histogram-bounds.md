---
id: mono-histogram-bounds
kind: basic
version: 1
level: 3
tags: [monotonic-stack, stacks, lc-84]
requires:
  - mono-stack-signal
  - cpp-essentials/vector-back-pop-back
refs:
  - https://leetcode.com/problems/largest-rectangle-in-histogram/
  - https://en.wikipedia.org/wiki/All_nearest_smaller_values
elaborate: The stack gives each bar its nearest lower bar on both sides in one pass. Where else would "nearest smaller on each side" answer a problem?
---

Largest Rectangle in Histogram (LC 84): the largest rectangle area
under bars of heights `h`, each 1 wide. `st` holds bar indices,
heights strictly rising from bottom to top. Bar `i` is no taller than the top bar `b`, so `b` is popped:

```cpp
int b = st.back();
st.pop_back();
int left = st.back();   // or -1 if st is now empty
```

## How wide is the largest rectangle of height `h[b]`?

---

**`i - left - 1`: the bars strictly between `left` and `i`.**

`i` is the first bar right of `b` no taller than it, `left` the nearest
shorter bar on its left. Every bar between is at least `h[b]` tall:
those right of `b` were popped before it, those left of it by `b` or
earlier.
