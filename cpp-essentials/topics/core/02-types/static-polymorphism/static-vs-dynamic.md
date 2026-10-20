---
id: staticpoly-static-vs-dynamic
kind: basic
version: 1
level: 2
tags: [polymorphism, templates]
requires:
  - virtual-pure-syntax
  - templates-instantiation
  - virtual-static-dynamic-type
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/language/function_template
elaborate: Say aloud when you would still choose the `virtual` version over the template, despite the lost inlining.
---

## Inlining pastes the callee's body at the call site. Compiled on its own, why can't `total` inline `s.area()`, though it could if `total` were a function template over the shape type?

```cpp
struct Shape { virtual double area() = 0; };
double total(Shape& s) { return s.area(); }
```

---

**At this call site the dynamic type of `s` is unknown, so the target is
chosen at run time.**

Any class derived from `Shape`, even one written later, may be behind
`s`, so there is no single body to paste in. A template
`total<Square>` is instantiated for one exact type, so it calls
`Square::area` directly and can inline it.
