---
id: expr-conditional-operator
kind: basic
version: 1
level: 1
tags: [expressions, operators]
refs:
  - https://en.cppreference.com/w/cpp/language/operator_other#Conditional_operator
  - https://eel.is/c++draft/expr.cond
---

## What value does `m` get?

```cpp
int a = 3, b = 8;
int m = a < b ? b : a;
```

---

**8: `c ? x : y` yields `x` when `c` is true, otherwise `y`.**

It is the *conditional operator*, an expression rather than a statement,
so it fits wherever a value does: an initializer, a `return`, an argument.
Only the chosen side is evaluated. Go has no equivalent; there you would
write an `if`.
