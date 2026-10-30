---
id: virtual-explain-dispatch
kind: explain
version: 3
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
An interviewer asks how a `virtual` call reaches the right function, and
what that machinery means for your code. Answer in about a minute.
---
- [ ] A `virtual` call runs the override of the object's dynamic type: a `Dog` through an `Animal&` runs `Dog`'s
- [ ] Each polymorphic object holds a vptr to its class's vtable, which the call indexes
- [ ] That is one hidden pointer per object, however many virtual functions, so `sizeof` grows
- [ ] Each call is indirect through the vtable, so the compiler usually cannot inline it
- [ ] Deleting through a base pointer without a virtual destructor is undefined behaviour
