---
id: complexity-space-stack-depth
kind: basic
version: 3
level: 2
tags: [complexity, space, recursion]
requires:
  - technique-call-stack-worked
  - complexity-big-o-scaling
elaborate: "Which recursive function of yours could overflow the stack on a large input, and how would you rewrite it?"
refs:
  - https://en.wikipedia.org/wiki/Space_complexity
  - https://en.wikipedia.org/wiki/Call_stack
---

## `sum` adds n numbers in O(n) time (`std::span<const int>` is a read-only view of an int array). How much stack space does it use, as a function of n?

```cpp
int sum(std::span<const int> a, int n) {
  if (n == 0) return 0;
  return a[n - 1] + sum(a, n - 1);
}
```

---

**O(n): all n + 1 calls are open at once, 17 for n = 16.**

Each open call keeps a stack frame. `sum(a, 16)` cannot add until
`sum(a, 15)` returns, and so on down to `sum(a, 0)`: every frame waits.

(Depth from an instrumented run under GCC 16.2.)
