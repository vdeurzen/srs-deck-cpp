---
id: virtual-call-in-constructor
kind: trace
version: 1
level: 3
tags: [inheritance, virtual, tracing, lifetime, misconception]
elaborate: Say aloud how you would restructure a base class whose constructor calls an `init()` hook meant for subclasses.
probes:
  1: { log: "BD" }
  2: { log: "BDDB" }
requires:
  - virtual-construct-order
  - virtual-static-dynamic-type
refs:
  - https://eel.is/c++draft/class.cdtor#4
  - https://en.cppreference.com/w/cpp/language/virtual#During_construction_and_destruction
---

Many expect a virtual call to reach the most-derived override wherever
it is made, constructors included. Predict `log`.

```cpp
std::string log;
struct Base {
    Base()          { log += name(); }
    virtual ~Base() { log += name(); }
    virtual char name() { return 'B'; }
};
struct Derived : Base {
    Derived()           { log += name(); }
    ~Derived()          { log += name(); }
    char name() { return 'D'; }
};
{
    Derived d;   // @1
}                // @2
```

---

Bases are built before the derived part and destroyed after it. While
`Base`'s constructor or destructor runs, the object **is** a `Base`: the
`Derived` members do not exist yet (or any more), so a virtual call
dispatches to `Base::name`. Never rely on a virtual call from
a constructor to reach the derived class.
