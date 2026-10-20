---
id: technique-memo-vs-table
kind: basic
version: 1
level: 2
tags: [dynamic-programming]
refs:
  - https://en.wikipedia.org/wiki/Dynamic_programming#Computer_science
requires:
  - technique-dp-overlapping-subproblems
elaborate: When would you keep the memoised recursion instead of converting it, and what would you say to defend that?
---

## You turn a memoised recursion into a bottom-up table loop. What must the loop order guarantee?

---

**Every cell the current cell reads is already filled.**

```cpp
long f[91];
f[0] = 0;
f[1] = 1;
for (int i = 2; i <= n; ++i)
  f[i] = f[i - 1] + f[i - 2];   // both already filled
```

Memoisation gets that order for free: recursion computes dependencies on
demand. In return the table needs no recursion depth and can drop old
cells: fib really needs only the last two.
