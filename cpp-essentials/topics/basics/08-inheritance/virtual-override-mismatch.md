---
id: virtual-override-mismatch
kind: basic
version: 1
level: 2
tags: [inheritance, virtual, override]
requires:
  - virtual-delete-through-base
elaborate: Say how many of the overrides in code you know are marked `override`, and what a silent mismatch there would cost.
refs:
  - https://en.cppreference.com/w/cpp/language/override
  - https://en.cppreference.com/w/cpp/language/virtual
---

## A `Student` passed as `Account&` is still charged `1.0`. Why does `Student::fee` not replace the base version? (`override` after a member function asks the compiler to check that it replaces a base `virtual`.)

```cpp
struct Account {
  virtual ~Account() = default;
  virtual double fee(double) { return 1.0; }
};
struct Student : public Account {
  double fee(float) { return 0.0; }
};
```

---

**Its parameter type differs (`float`, not `double`), so it overrides
nothing.** It is a new function that merely hides the base one. An
override needs the same parameter list. Writing
`double fee(float) override` turns this silent bug into a compile
error, which is why every override should say `override`.
