---
id: lambda-closure-type
kind: basic
version: 1
level: 1
tags: [lambdas, callables]
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
  - https://eel.is/c++draft/expr.prim.lambda.closure
---

## What does the compiler turn `[n](int x) { return x + n; }` into?

---

**An object of a unique, unnamed class: `n` becomes a data member, the
body a `const` `operator()`.**

```cpp
struct Unnamed { int n; int operator()(int x) const { return x + n; } };
```

Every later lambda rule (unique types, `mutable`, captures that dangle)
follows from this one picture.
