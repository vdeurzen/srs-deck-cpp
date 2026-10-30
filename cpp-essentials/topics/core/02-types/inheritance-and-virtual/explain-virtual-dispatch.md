---
id: virtual-explain-dispatch
kind: explain
version: 2
level: 3
tags: [inheritance, virtual]
requires:
  - virtual-vptr-sizeof
  - virtual-dispatch-dynamic-type
  - staticpoly-static-vs-dynamic
  - virtual-destructor
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
elaborate: Say aloud which class in your own code you would make `virtual`, and which you would keep non-virtual, and why.
---
In an interview you are asked what `virtual` does in C++, what it costs
and where it bites. Answer in about a minute.
---
- [ ] A `virtual` call runs the override of the object's dynamic type, chosen at run time
- [ ] So a `Dog` reached through an `Animal&` runs `Dog`'s override
- [ ] Each polymorphic object holds a vptr to its class's vtable, which the call indexes
- [ ] Each call is indirect through the vtable, so the compiler usually cannot inline it
- [ ] Deleting through a base pointer without a virtual destructor is undefined behaviour
