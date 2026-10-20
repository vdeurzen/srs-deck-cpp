---
id: complexity-space-stack-depth
kind: basic
version: 2
level: 2
tags: [complexity, space, recursion]
requires:
  - complexity-recursion-tree-calls
elaborate: "Which recursive function of yours could overflow the stack on a large input, and would splitting in halves instead of peeling fix it?"
refs:
  - https://en.wikipedia.org/wiki/Space_complexity
  - https://en.wikipedia.org/wiki/Call_stack
---

## Both sum n numbers in O(n) time (`std::span<const int>` is a read-only view of an int array). How much stack space does each use?

```cpp
int sum(std::span<const int> a, int n) {            // peel one
  if (n == 0) return 0;
  return a[n - 1] + sum(a, n - 1);
}
int halves(std::span<const int> a, int lo, int hi) { // split
  if (hi - lo == 1) return a[lo];
  int m = (lo + hi) / 2;
  return halves(a, lo, m) + halves(a, m, hi);
}
```

---

**`sum`: O(n) frames; `halves`: O(log n), one root-to-leaf path.**

Every live call holds a stack frame. Peeling keeps all n + 1 alive:
17 for n = 16. Splitting finishes the left half before the right one
starts, so at most log₂ 16 + 1 = 5 are alive at once.

(Depths from an instrumented run under GCC 16.2.)
