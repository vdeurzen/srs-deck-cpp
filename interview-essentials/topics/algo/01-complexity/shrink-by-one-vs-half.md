---
id: complexity-shrink-by-one-vs-half
kind: basic
version: 2
level: 2
tags: [complexity, recurrences]
requires:
  - complexity-recursion-tree-calls
  - complexity-geometric-sum-intro
  - complexity-asym-theta-sandwich
elaborate: "Where else does 'shrink by one' versus 'shrink by half' decide a cost, for instance peeling one element off versus splitting in two?"
refs:
  - https://en.wikipedia.org/wiki/Recurrence_relation
---

## Both do `n` units of work and recurse once. Why is `by_one` Θ(n²) but `by_half` Θ(n)?

```cpp
void by_one(int n)  { if (n == 0) return; work += n; by_one(n - 1); }
void by_half(int n) { if (n == 0) return; work += n; by_half(n / 2); }
```

---

**How the input shrinks: n + (n − 1) + … + 1 = n(n + 1)/2, but n + n/2 + … < 2n.**

For n = 4: 4 + 3 + 2 + 1 = 10 against 4 + 2 + 1 = 7. Doubling n
quadruples the first, only doubles the second. (Run under GCC 16.2.)
