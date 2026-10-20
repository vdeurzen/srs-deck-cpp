---
id: virtual-slice-parameter
kind: trace
version: 2
level: 2
tags: [inheritance, virtual, slicing, tracing]
requires:
  - virtual-function-intro
  - fn-param-change-intro
probes:
  1: { a: "4" }
  2: { b: "0" }
elaborate: Find a function in your code that takes a base class by value; what would a derived argument lose?
refs:
  - https://en.cppreference.com/w/cpp/language/object#Subobjects
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct Shape {
  virtual int corners() { return 0; }
};
struct Square : public Shape {
  int corners() { return 4; }
};
int by_ref(Shape& s)  { return s.corners(); }
int by_value(Shape s) { return s.corners(); }

int main() {
  Square q;
  int a = by_ref(q);     // @1
  int b = by_value(q);   // @2
}
```

---

`by_ref` gets a reference to the `Square` itself, so the virtual call
dispatches to `Square::corners`. `by_value` gets a brand-new `Shape`,
copied from only the `Shape` part of `q`: the `Square` part is
**sliced** off, and the parameter's dynamic type is `Shape`. Dispatch
needs a reference or pointer to the original object. Verified by compiling
and running an instrumented copy under GCC 16.2 (`g++ -std=c++23`).
