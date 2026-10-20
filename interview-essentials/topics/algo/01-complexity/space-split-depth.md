---
id: complexity-space-split-depth
kind: basic
version: 1
level: 2
tags: [complexity, space, recursion]
requires:
  - complexity-space-stack-depth
  - complexity-recursion-tree-calls
elaborate: "Say in one sentence, as to an interviewer, why a recursion that makes n calls in total can still need only O(log n) stack."
refs:
  - https://en.wikipedia.org/wiki/Space_complexity
  - https://en.wikipedia.org/wiki/Call_stack
---

## `total(a, 0, n)` adds n numbers in O(n) time (`std::span<const int>` is a read-only view of an int array). How much stack space does it use, as a function of n?

```cpp
int total(std::span<const int> a, int lo, int hi) {
  if (hi - lo == 1) return a[lo];
  int m = (lo + hi) / 2;
  return total(a, lo, m) + total(a, m, hi);
}
```

---

**O(log n): only one root-to-leaf path is open at a time.**

One half finishes before the other starts, so the open calls are one
per level: log₂ 16 + 1 = 5 for n = 16, though 31 calls run in total.

(Depth from an instrumented run under GCC 16.2.)
