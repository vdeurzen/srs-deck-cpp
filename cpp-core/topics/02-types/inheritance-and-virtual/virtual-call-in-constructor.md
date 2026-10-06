---
id: virtual-call-in-constructor
kind: trace
version: 1
level: 3
tags: [inheritance, virtual, tracing, lifetime, misconception]
elaborate: Do you have a base class whose constructor calls an `init()` hook meant for subclasses? What runs instead, and how would you restructure it?
probes:
  1: { log: "BD" }
  2: { log: "BDDB" }
requires:
  - virtual-dispatch-dynamic-type
refs:
  - https://eel.is/c++draft/class.cdtor#4
  - https://en.cppreference.com/w/cpp/language/virtual#During_construction_and_destruction
---

```cpp
std::string log;
struct Base {
    Base()          { log += name(); }
    virtual ~Base() { log += name(); }
    virtual char name() const { return 'B'; }
};
struct Derived : Base {
    Derived()           { log += name(); }
    ~Derived() override { log += name(); }
    char name() const override { return 'D'; }
};
{
    Derived d;   // @1
}                // @2
```

---

Bases are built before the derived part and destroyed after it. While
`Base`'s constructor or destructor runs, the object **is** a `Base`: the
`Derived` members do not exist yet (or any more), so a virtual call
dispatches to `Base::name`. GCC implements this by setting the vptr to each
class's vtable as its constructor starts. Never rely on a virtual call from
a constructor to reach the derived class. Verified by running an
instrumented copy under GCC 16.2 (`g++ -std=c++23`).
