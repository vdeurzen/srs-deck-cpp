---
id: virtual-explain-dispatch
kind: explain
version: 2
level: 3
tags: [inheritance, virtual]
requires:
  - virtual-vptr-sizeof
  - virtual-slicing
  - staticpoly-static-vs-dynamic
  - virtual-destructor
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
elaborate: Say aloud which class in your own code you would make `virtual`, and which you would keep non-virtual, and why.
---
A colleague who knows Go interfaces asks what `virtual` does in C++, what
it costs and where it bites. Answer them in about a minute.
---
- [ ] Problem: one call site runs each derived type's own override, chosen by the object's dynamic type
- [ ] Mechanism: each polymorphic object holds a vptr to its class's vtable, which the call indexes
- [ ] Example: a `Dog` reached through an `Animal&` runs `Dog`'s override
- [ ] Cost: each call is indirect through the vtable, so the compiler usually cannot inline it
- [ ] Pitfall: deleting through a base pointer without a virtual destructor is undefined behaviour
