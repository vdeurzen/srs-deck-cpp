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

## Both add `n` to a global `work` and recurse once. Why is `f` Θ(n²) but `g` Θ(n)?

```cpp
void f(int n) { if (n == 0) return; work += n; f(n - 1); }
void g(int n) { if (n == 0) return; work += n; g(n / 2); }
```

---

**`f` shrinks n by one, `g` halves it: n(n + 1)/2 against under 2n.**

`f` adds n + (n − 1) + … + 1; `g` adds n + n/2 + n/4 + …, a
halving series. For n = 4: 10 against 7. Doubling n quadruples the
first, only doubles the second. (Run under GCC 16.2.)
