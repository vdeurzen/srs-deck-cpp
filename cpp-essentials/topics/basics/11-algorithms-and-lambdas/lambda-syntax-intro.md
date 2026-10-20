---
id: lambda-syntax-intro
kind: basic
version: 1
level: 1
tags: [lambdas, foundations]
requires:
  - types-auto-deduces
elaborate: Say why listing the captures makes a lambda expression easier to review than one whose body could touch any local.
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
  - https://eel.is/c++draft/expr.prim.lambda
---

```cpp
int base = 10;
auto add = [base](int x) { return base + x; };
int s = add(5);
```

## The right-hand side of `add` is a lambda expression, C++'s function literal. What does the `[base]` part do?

---

**It captures `base`, so the lambda expression's body may use that local variable.**

A lambda expression is `[captures](parameters) { body }`. It sees no local you
don't list: `[](int x) { return base + x; }` does not
compile. Evaluating it makes a closure object; `add(5)` calls that object like a function, giving 15.
