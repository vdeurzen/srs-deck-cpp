---
id: virtual-slice-parameter
kind: trace
version: 1
level: 2
tags: [inheritance, virtual, slicing, tracing]
requires:
  - virtual-enable-dispatch
  - fn-by-value-vs-reference
probes:
  1: { a: "circle" }
  2: { b: "shape" }
refs:
  - https://en.cppreference.com/w/cpp/language/object#Subobjects
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct Shape {
  virtual ~Shape() = default;
  virtual std::string name() const { return "shape"; }
};
struct Circle : Shape {
  std::string name() const override { return "circle"; }
};
std::string by_ref(const Shape& s) { return s.name(); }
std::string by_value(Shape s)      { return s.name(); }

int main() {
  Circle c;
  std::string a = by_ref(c);     // @1
  std::string b = by_value(c);   // @2
}
```

---

`by_ref` gets a reference to the `Circle` itself, so the virtual call
dispatches to `Circle::name`. `by_value` gets a brand-new `Shape`,
copy-constructed from only the `Shape` part of `c`: the `Circle` part is
**sliced** off, and the parameter's dynamic type is `Shape`. Dispatch
needs a reference or pointer to the original object. Verified by compiling
and running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
