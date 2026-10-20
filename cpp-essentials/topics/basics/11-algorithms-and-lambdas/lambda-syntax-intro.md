---
id: lambda-syntax-intro
kind: basic
version: 1
level: 1
tags: [lambdas, foundations]
requires:
  - types-auto-deduces
elaborate: Say why C++ makes you list what a lambda captures when a Go closure captures automatically.
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
  - https://eel.is/c++draft/expr.prim.lambda
---

```cpp
int base = 10;
auto add = [base](int x) { return base + x; };
int s = add(5);
```

## `add` holds a lambda, C++'s function literal. What does the `[base]` part do?

---

**It captures `base`, so the lambda's body may use that local variable.**

A lambda is `[captures](parameters) { body }`. Unlike a Go closure, it
sees no local you don't list: `[](int x) { return base + x; }` does not
compile. `add(5)` calls it like a function, giving 15.
