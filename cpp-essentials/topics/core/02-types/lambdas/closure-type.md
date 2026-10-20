---
id: lambda-closure-type
kind: basic
version: 1
level: 1
tags: [lambdas, callables]
requires:
  - lambda-syntax-intro
  - class-struct-members
  - const-member-on-const-ref
refs:
  - https://en.cppreference.com/w/cpp/language/lambda
  - https://eel.is/c++draft/expr.prim.lambda.closure
elaborate: Where else have you written a small struct whose only job is to be called like a function, and how would a lambda expression replace it?
---

## What does the compiler turn `[n](int x) { return x + n; }` into?

---

**An object of a unique unnamed class with a `const` `operator()`.**

```cpp
struct Unnamed { int n; int operator()(int x) const { return x + n; } };
```

The capture `n` becomes a data member and the body becomes `operator()`,
the member function a call `f(x)` on the object runs.
Every later rule about lambda expressions (unique types, captures that dangle) follows from
this one picture.
