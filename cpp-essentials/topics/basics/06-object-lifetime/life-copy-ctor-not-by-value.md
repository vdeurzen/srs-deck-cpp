---
id: life-copy-ctor-not-by-value
kind: basic
version: 1
level: 3
tags: [lifetime, copy, special-members]
requires:
  - life-copy-ctor-vocab
  - fn-param-change-intro
elaborate: Say what the compiler error would tell a teammate who wrote this, and the one-token fix.
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://eel.is/c++draft/class.copy.ctor#5
---

## GCC rejects the second constructor as invalid. Why can a constructor of `Tally` not take a `Tally` by value?

```cpp
struct Tally {
  int n;
  Tally(int v) { n = v; }
  Tally(Tally other) { n = other.n; }
};
```

---

**Creating the by-value parameter would itself be a copy: endless recursion.**

A by-value parameter is a new object initialised from the argument.
Initialising a `Tally` from a `Tally` is the copy constructor's job, so
each call would first need another call. The standard makes this
signature ill-formed; the fix is `const Tally&`.
