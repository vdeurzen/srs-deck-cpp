---
id: virtual-static-dispatch
kind: basic
version: 1
level: 1
tags: [inheritance, virtual]
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
elaborate: Go interface methods always dispatch on the dynamic type. Where in a C++ class hierarchy does that default flip, and why might C++ have chosen it?
---

## Why does this print `shape`, not `circle`?

```cpp
struct Shape  { const char* name() const { return "shape"; } };
struct Circle : Shape { const char* name() const { return "circle"; } };
Circle c;
Shape& s = c;
std::puts(s.name());
```

---

**`name` is not `virtual`, so the call binds to the static type `Shape`.**

A non-virtual call is resolved at compile time from the type of the
expression (`Shape&`), whatever object it refers to. `Circle::name` merely
hides `Shape::name`. Only a `virtual` function dispatches on the object's
**dynamic** type.
