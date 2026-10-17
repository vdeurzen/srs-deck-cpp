---
id: vc-rvalue-ref-binds-temporaries
kind: basic
version: 1
level: 2
tags: [value-categories, references, temporaries]
requires:
  - vc-plain-ref-rejects-temporary
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Rvalue_references
  - https://eel.is/c++draft/dcl.init.ref#5
---

## Given `void store(int&& x);` and `int n = 1;`, which of `store(5)` and `store(n)` compiles?

```cpp
void store(int&& x);
int n = 1;
store(5);
store(n);
```

---

**Only `store(5)`.** `int&&` is an *rvalue reference*: the mirror image
of `int&`, it binds only to rvalues (non-lvalues, such as the prvalue `5`),
and refuses lvalues like `n`. A function taking `T&&` therefore knows
its argument is a temporary nobody else will look at again, which later
lets it take the argument's contents instead of copying them.
