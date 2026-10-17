---
id: virtual-override-mismatch
kind: basic
version: 1
level: 2
tags: [inheritance, virtual, override]
requires:
  - virtual-enable-dispatch
refs:
  - https://en.cppreference.com/w/cpp/language/override
  - https://en.cppreference.com/w/cpp/language/virtual
---

## A `Student` passed as `Account&` is still charged `1.0`. Why does `Student::fee` not replace the base version?

```cpp
struct Account {
  virtual ~Account() = default;
  virtual double fee(double) const { return 1.0; }
};
struct Student : Account {
  double fee(float) const { return 0.0; }
};
```

---

**Its parameter type differs (`float`, not `double`), so it overrides
nothing.** It is a new function that merely hides the base one. An
override needs the same parameter list and qualifiers. Writing
`double fee(float) const override` turns this silent bug into a compile
error, which is why every override should say `override`.
