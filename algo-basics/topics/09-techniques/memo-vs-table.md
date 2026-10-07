---
id: technique-memo-vs-table
kind: basic
version: 1
level: 2
tags: [dynamic-programming]
requires:
  - technique-dp-memo-calls
refs:
  - https://en.wikipedia.org/wiki/Dynamic_programming#Computer_science
---

## You turn a memoised recursion into a bottom-up table loop. What must the loop order guarantee?

---

**Every cell the current cell reads is already filled.**

```cpp
long f[91] = {0, 1};
for (int i = 2; i <= n; ++i)
  f[i] = f[i - 1] + f[i - 2];   // both already filled
```

Memoisation gets that order for free: recursion computes dependencies on
demand. In return the table needs no recursion depth and can drop old
cells: fib really needs only the last two.
