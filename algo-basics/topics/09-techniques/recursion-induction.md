---
id: technique-recursion-induction
kind: cloze
version: 1
level: 2
tags: [foundations, recursion, induction]
requires:
  - technique-recursion-sum-code
refs:
  - https://en.wikipedia.org/wiki/Mathematical_induction
---

```cpp
int sum(const int* a, int n) {   // sum of a[0..n)
  if (n == 0) return 0;
  return a[n - 1] + sum(a, n - 1);
}
```

To trust `sum` for every `n ≥ 0`, check `n == 0` (an empty prefix sums
to 0), then for larger `n` simply **assume** that
`sum(a, n - 1)` returns the sum of {{c1::`a[0..n-1)`::which slice?}}.
Adding `a[n - 1]` then gives the sum of `a[0..n)`. The assumption is
fair only because the call is on {{c2::a smaller `n`::a property of the argument}}.

---

This is induction: the base case is the base of the proof, the
recursive call is the induction hypothesis. You never trace the calls
below; you check one level and trust the rest. If the call were not on
a smaller input, the "assumption" would be the very thing being proved.
