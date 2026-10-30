---
id: staticpoly-explain-choosing-dispatch
kind: explain
version: 1
level: 3
tags: [polymorphism]
requires:
  - staticpoly-crtp-base
  - staticpoly-type-erasure
  - cpp-essentials/vocab-variant-closed-set
elaborate: Which of these mechanisms does a codebase you know use for its own "many types, one call" problem, and would you choose it again?
refs:
  - https://en.cppreference.com/w/cpp/language/crtp
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/utility/variant/visit
---
A renderer calls `draw()` on many shape types. An interviewer asks how you
would choose the dispatch mechanism. Explain it to them.
---
- [ ] First ask whether the set of shape types is known where the call is compiled, or only at run time
- [ ] Known at compile time, a template or CRTP base fixes each call target, so it can be inlined
- [ ] A virtual base dispatches at run time through one interface, but every shape must inherit from it
- [ ] Type erasure dispatches at run time over unrelated types, even later ones, and keeps value semantics
- [ ] A closed set known up front fits `std::variant` with `std::visit`: values, no base class, no allocation
