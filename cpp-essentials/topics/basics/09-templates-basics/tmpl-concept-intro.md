---
id: tmpl-concept-intro
kind: basic
version: 2
level: 1
tags: [templates, concepts]
requires:
  - tmpl-why-template
  - std-names-and-headers
elaborate: Where in your own code would a constraint like `std::integral` have turned a confusing error into a clear one?
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/concepts/integral
---

```cpp
#include <concepts>
template <std::integral T>
T half(T x) { return x / 2; }
```

## Written with `template <typename T>`, `half(7.0)` returns `3.5`. With the line above instead, does `half(7.0)` return `3.5`, return `3`, or fail to compile?

---

**It fails to compile: `double` does not satisfy `std::integral`.**
`std::integral` is a *concept*: a named compile-time test on a type.
Written in place of `typename`, it admits only the types that pass it,
the integer types (plus `char` and `bool`). Nothing converts `7.0` to make
it fit: `T` is deduced as `double`, and that `T` is rejected.
