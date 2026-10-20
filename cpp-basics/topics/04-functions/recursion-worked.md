---
id: fn-recursion-worked
kind: basic
version: 1
level: 1
tags: [functions, recursion, worked-example]
requires:
  - cpp-essentials/string-basics
refs:
  - https://eel.is/c++draft/expr.call#14
---

`tail` calls itself. `n == 0` is its **base case**, the input it answers
without calling itself again.

```cpp
std::string t;
void tail(int n) {
    if (n == 0) return;
    tail(n - 1);
    t += char('0' + n);   // after the inner call
}
// main calls tail(2)
```

| step | running | what happens | `t` |
| --- | --- | --- | --- |
| 1 | `tail(2)` | calls `tail(1)`, waits | `""` |
| 2 | `tail(1)` | calls `tail(0)`, waits | `""` |
| 3 | `tail(0)` | base case: returns | `""` |
| 4 | back in `tail(1)` | appends `'1'` | `"1"` |
| 5 | back in `tail(2)` | appends `'2'` | `"12"` |

## `tail(2)` started first, yet step 4 appends `1` before step 5 appends `2`. Why?

---

**Each call finishes only after its inner call returns, innermost first.**

Every call has its own `n` and pauses at `tail(n - 1)`. The deepest call,
`tail(0)`, returns first, so the work written *after* the recursive call
runs on the way back out: `tail(1)`'s append, then `tail(2)`'s.
