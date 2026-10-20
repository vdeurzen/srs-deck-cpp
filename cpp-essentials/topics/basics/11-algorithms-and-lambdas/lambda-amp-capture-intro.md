---
id: lambda-amp-capture-intro
kind: basic
version: 1
level: 1
tags: [lambdas, foundations]
requires:
  - lambda-syntax-intro
  - ptr-reference-must-bind
elaborate: Say when capturing by reference would be a bug in your own code.
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://eel.is/c++draft/expr.prim.lambda.capture
---

```cpp
int total = 0;
int step = 3;
auto add = [&]() { total += step; };
add();
add();
```

## What is `total` after the two calls?

---

**6: `[&]` captures by reference, so `add` changes the caller's own `total`.**

`[&]` makes every local the body uses a reference to the original
variable, not a copy; `[&total]` does the same for `total` alone. Each
call adds `step` to the one `total` that the enclosing code reads.
