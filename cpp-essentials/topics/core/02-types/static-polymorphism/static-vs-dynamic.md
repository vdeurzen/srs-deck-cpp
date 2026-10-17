---
id: staticpoly-static-vs-dynamic
kind: basic
version: 1
level: 2
tags: [polymorphism, templates]
requires:
  - virtual-static-dispatch
  - templates-instantiation
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/language/function_template
---

## Why can't the compiler inline `s.area()` here, though it could if `total` were a function template over the shape type?

```cpp
struct Shape { virtual double area() const = 0; };
double total(const Shape& s) { return s.area(); }
```

---

**The target is read from the object's vtable at run time; a template
instantiation knows the exact type at compile time.**

That run-time choice is also what lets one `std::vector<Shape*>` hold
mixed shapes, which a template cannot do.
