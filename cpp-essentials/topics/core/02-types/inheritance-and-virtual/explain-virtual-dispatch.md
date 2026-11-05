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
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
elaborate: Say aloud which class in your own code you would make `virtual`, and which you would keep non-virtual, and why.
---
An interviewer asks how a `virtual` call reaches the right function, and
what that machinery means for your code. Answer in about a minute.
---
- [ ] Each polymorphic object holds a hidden vptr to its class's vtable
- [ ] A `virtual` call indexes the object's vtable, so a `Dog` through an `Animal&` runs `Dog`'s override
- [ ] The vptr adds one hidden pointer per object, however many virtual functions, so `sizeof` grows
- [ ] A `virtual` call is indirect through the vtable, so the compiler usually cannot inline it
- [ ] (empty: tick this)
