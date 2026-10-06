---
id: staticpoly-dispatch-trace
kind: trace
version: 1
level: 3
tags: [polymorphism, tracing]
requires:
  - staticpoly-crtp-base
  - virtual-static-dispatch
probes:
  1: { a: "2", b: "2" }
  2: { x: "2", y: "1" }
refs:
  - https://en.cppreference.com/w/cpp/language/crtp
  - https://en.cppreference.com/w/cpp/language/virtual
---

```cpp
struct VBase { virtual int id() const { return 1; }
               int call() const { return id(); } };
struct VDer : VBase { int id() const override { return 2; } };

template<class D> struct CBase { int id() const { return 1; }
  int call() const { return static_cast<const D*>(this)->id(); } };
struct CDer : CBase<CDer> { int id() const { return 2; } };

VDer v;  VBase& vb = v;
CDer c;  CBase<CDer>& cb = c;
int a = vb.call(), b = vb.id();   // @1
int x = cb.call(), y = cb.id();   // @2
```

---

A virtual `id` reaches `VDer` from any call through the base. CRTP only
dispatches where the base **casts** to `D`: `cb.call()` does, but
`cb.id()` is an ordinary non-virtual call on the static type
`CBase<CDer>`, so it runs the base's `id`. Verified with GCC 16.2
(`g++ -std=c++23`).
