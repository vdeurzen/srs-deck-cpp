---
id: initialization-user-ctor-no-zero
kind: basic
version: 1
level: 3
tags: [initialization, classes, misconception]
requires:
  - initialization-default-value-zero
elaborate: Find a class in your code with a hand-written empty default constructor. Would `= default` (or a default member initialiser) make its `T{}` safe?
refs:
  - https://en.cppreference.com/w/cpp/language/value_initialization
  - https://timsong-cpp.github.io/cppwp/n4950/dcl.init.general#9
---

## "Empty braces always zero the members." In C++23, what is `m.ticks` after this line runs inside a function?

```cpp
struct Meter {
    Meter() {}
    int ticks;
};
void sample() {
    Meter m{};
}
```

---

**Indeterminate: reading it is undefined behaviour** (unless `m` were
`static`). `{}` value-initializes `m`, which zero-fills first only when the
default constructor is *not user-provided*: true for aggregates and
`Meter() = default;`, false here. Fix: `int ticks = 0;`.
