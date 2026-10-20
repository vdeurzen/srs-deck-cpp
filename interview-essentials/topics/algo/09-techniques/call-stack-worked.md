---
id: technique-call-stack-worked
kind: basic
version: 1
level: 1
tags: [foundations, recursion, worked-example]
refs:
  - https://en.wikipedia.org/wiki/Call_stack
---

```cpp
int fact(int n) {
  if (n <= 1) return 1;
  return n * fact(n - 1);
}
```

`fact(3)`, step by step:

| step | running | open calls | result |
| --- | --- | --- | --- |
| 1 | `fact(3)` calls `fact(2)` | 3 | — |
| 2 | `fact(2)` calls `fact(1)` | 3, 2 | — |
| 3 | `fact(1)`: `n <= 1` | 3, 2, 1 | returns 1 |
| 4 | `fact(2)` resumes | 3, 2 | 2 · 1 = 2 |
| 5 | `fact(3)` resumes | 3 | 3 · 2 = 6 |

## Why does `fact(3)` do its multiplication only at step 5, two steps after the deepest call?

---

**It needs `fact(2)`'s value, so it waits, paused, until that call returns.**
Each open call keeps its own `n` (a stack frame) while it waits.
Calls open on the way down and finish in reverse on the way up: the
last opened, `fact(1)`, finishes first.
