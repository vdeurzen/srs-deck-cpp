---
id: virtual-static-dispatch
kind: basic
version: 1
level: 2
tags: [inheritance, virtual]
requires:
  - virtual-dispatch-which-runs
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://eel.is/c++draft/class.virtual#16
elaborate: Where does your own code call a base-class version from inside an override, and what would happen if the qualification were dropped?
---

## `name` is virtual and `s` refers to a `Circle`. Why does this print `shape`?

```cpp
struct Shape {
    virtual ~Shape() = default;
    virtual const char* name() const { return "shape"; }
};
struct Circle : Shape { const char* name() const override { return "circle"; } };
Circle c;
Shape& s = c;
std::puts(s.Shape::name());
```

---

**The qualified name `Shape::name` suppresses virtual dispatch: the call
binds statically to exactly that function.**

The qualifier picks the function at compile time,
whatever object `s` refers to. That is how an override calls its base
version: inside `Circle::name`, a plain `name()` would call itself
forever; `Shape::name()` reaches the base.
