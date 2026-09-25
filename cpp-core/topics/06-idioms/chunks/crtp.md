---
id: chunks-crtp
kind: chunk
version: 1
level: 3
tags: [idioms, templates]
expose_ms: 9000
compile:
  harness: |
    struct Circle : Shape<Circle> {
      double r;
      double computeArea() const { return 3.14159 * r * r; }
    };
    int main() {
      Circle c;
      c.r = 2.0;
      return c.area() > 0 ? 0 : 1;
    }
refs:
  - https://wg21.link/p0847
---

```cpp
template <typename Derived>
struct Shape {
  double area() const {
    return static_cast<const Derived*>(this)->computeArea();
  }
};
```

---

The Curiously Recurring Template Pattern: a base class template
parameterised on its own derived class, so it can `static_cast` `this`
down to `Derived` and call a member `Derived` is expected to provide —
static, compile-time polymorphism with no vtable and no virtual call.
P0847 ("Deducing this") gives most CRTP uses a simpler alternative — an
explicit object parameter — but the pattern itself still shows up
throughout the standard library and older codebases.
