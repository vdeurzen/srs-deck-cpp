---
id: tmpl-concept-error
kind: basic
version: 1
level: 2
tags: [templates, concepts, diagnostics]
requires:
  - tmpl-error-at-instantiation
  - tmpl-concept-intro
refs:
  - https://en.cppreference.com/w/cpp/language/constraints
  - https://en.cppreference.com/w/cpp/concepts/integral
---

## Both calls fail to compile. How does the error for `half_b` differ from the one for `half_a`?

```cpp
template <typename T>
T half_a(T x) { return x >> 1; }

template <std::integral T>
T half_b(T x) { return x >> 1; }

half_a(2.5);   // error
half_b(2.5);   // error
```

---

**`half_b` fails at the call: "constraints not satisfied", naming
`std::integral<double>`.** `std::integral T` is a *constraint*: it is
checked before the body is ever generated. `half_a` only fails inside
its body, at `x >> 1`. The concept puts the requirement in the
declaration, where the caller reads it.
