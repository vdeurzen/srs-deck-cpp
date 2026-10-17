---
id: virtual-dispatch-dynamic-type
kind: trace
version: 1
level: 1
tags: [inheritance, virtual, tracing]
probes:
  1: { a: "3" }
  2: { b: "4" }
requires:
  - virtual-static-dispatch
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct Shape {
    virtual ~Shape() = default;
    virtual int sides() const { return 0; }
};
struct Tri  : Shape { int sides() const override { return 3; } };
struct Quad : Shape { int sides() const override { return 4; } };
Tri t;
Quad q;
Shape* p = &t;
int a = p->sides();   // @1
p = &q;
int b = p->sides();   // @2
```

---

`p` has the same static type (`Shape*`) at both calls, but `sides` is
`virtual`, so each call runs the override of the object `p` points to at
that moment: its **dynamic type**. The same line of code picks different
functions at run time; that is runtime polymorphism. Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
