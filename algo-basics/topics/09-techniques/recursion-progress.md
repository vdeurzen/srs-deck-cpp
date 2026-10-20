---
id: technique-recursion-progress
kind: basic
version: 1
level: 1
tags: [foundations, recursion]
requires:
  - interview-essentials/technique-recursion-sum-code
  - technique-termination-measure
refs:
  - https://en.wikipedia.org/wiki/Recursion_(computer_science)#Base_case
---

```cpp
int pairs(int n) {          // how many pairs fit in n items
  if (n == 0) return 0;
  return 1 + pairs(n - 2);
}
```

## `pairs(4)` returns 2, but `pairs(3)` never returns. The base case is there; what is wrong?

---

**The step does not always reach it: 3 → 1 → −1 → −3 … skips over 0.**

Each call must move *toward a base case it is sure to hit*, not just
make the input smaller. Fix with `if (n < 2) return 0;`, which every
`n ≥ 0` eventually reaches.
