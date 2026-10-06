---
id: staticpoly-explain-choosing-dispatch
kind: explain
version: 1
level: 3
tags: [polymorphism]
requires:
  - staticpoly-crtp-base
  - staticpoly-type-erasure
refs:
  - https://en.cppreference.com/w/cpp/language/crtp
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---
A renderer calls `draw()` on many shape types. Explain how you would
choose between a template (or CRTP), a virtual base, type erasure, and
`std::variant`.
---
- [ ] Deciding question: is the set of shape types known where the call is compiled, or only at run time?
- [ ] Template/CRTP: the call target is fixed per instantiation, so it can be inlined
- [ ] Virtual base: one interface type dispatched at run time, but every shape must inherit from it
- [ ] Type erasure: run-time dispatch over unrelated types while keeping value semantics
- [ ] A closed set known up front fits `std::variant` + `std::visit`: values, no base class, no allocation
