---
id: expr-increment-value
kind: basic
version: 1
level: 1
tags: [expressions, operators]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_incdec
  - https://eel.is/c++draft/expr.post.incr
---

## What are `a`, `b` and `i` after these three lines?

```cpp
int i = 2;
int a = i++;
int b = ++i;
```

---

**2, 4 and 4: `i++` yields the old value, `++i` the new one.**

Both forms add 1 to `i` *and* produce a value; in Go `i++` is only a
statement. So `out[k++] = x` writes slot `k`, then moves `k` on, while
`out[++k] = x` skips slot `k`.
