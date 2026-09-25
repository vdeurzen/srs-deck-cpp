---
id: value-categories-taxonomy
kind: basic
version: 1
level: 1
tags: [value-categories]
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
---

## What are the three primary value categories in C++11 and later, and how do `glvalue` and `rvalue` relate to them?

---

Every expression is exactly one of **lvalue**, **xvalue**, or **prvalue** —
the three primary categories. Two composite categories group them:

- **glvalue** ("generalized lvalue") = lvalue or xvalue. A glvalue has
  identity: you can find its address or refer to it again.
- **rvalue** = xvalue or prvalue. An rvalue can be moved from.

So `xvalue` sits in the overlap: it has identity *and* can be moved from —
the classic example is `std::move(x)`, which is a cast to an rvalue
reference, not a function that moves anything itself.
