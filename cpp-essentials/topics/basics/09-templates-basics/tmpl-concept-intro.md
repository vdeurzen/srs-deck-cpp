---
id: tmpl-concept-intro
kind: basic
version: 1
level: 1
tags: [templates, concepts]
requires:
  - tmpl-function-syntax
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/concepts/integral
---

## Which of the three calls compile?

```cpp
#include <concepts>
template <std::integral T>
T half(T x) { return x / 2; }

half(7);
half(7u);
half(7.0);
```

---

**`half(7)` and `half(7u)`; `half(7.0)` is rejected.** `std::integral`
is a *concept*: a named compile-time test on a type. Written in place of
`typename`, it admits only the types that pass it: every integer type,
signed or unsigned (plus `char` and `bool`), but not `double`.
