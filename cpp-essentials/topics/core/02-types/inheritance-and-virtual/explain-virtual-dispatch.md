---
id: virtual-explain-dispatch
kind: explain
version: 1
level: 3
tags: [inheritance, virtual]
requires:
  - virtual-vptr-sizeof
  - virtual-call-in-constructor
  - virtual-destructor
  - virtual-slicing
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
---
A colleague asks what `virtual` actually costs and where it bites. Explain
how a virtual call works and the three classic traps.
---
- [ ] Each polymorphic object carries a vptr to its class's vtable; a virtual call goes through that table indirectly
- [ ] The main cost is that an indirect call usually cannot be inlined, which blocks further optimisation
- [ ] Trap: deleting through a base pointer without a virtual destructor is UB and skips the derived destructor
- [ ] Trap: copying a derived object into a base value slices it; dispatch needs a reference or pointer
- [ ] Trap: virtual calls in a constructor or destructor dispatch to the class currently being built or destroyed, not the most-derived one
