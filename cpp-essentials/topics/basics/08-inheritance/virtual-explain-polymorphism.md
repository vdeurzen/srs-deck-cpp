---
id: virtual-explain-polymorphism
kind: explain
version: 1
level: 2
tags: [inheritance, virtual, dispatch]
requires:
  - virtual-override-mismatch
  - virtual-delete-through-base
  - virtual-slice-parameter
  - virtual-pure-syntax
elaborate: Say where in a codebase you know a `virtual` interface is used, and what the alternative without it would look like.
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/language/abstract_class
---
A newcomer wants one function that takes "any shape" and runs each kind
of shape's own code. Explain to them how C++ does this.
---
- [ ] The problem: one function, many shape types, each needing its own code at run time
- [ ] A `virtual` base function, called through `Shape&` or `Shape*`, runs the object's dynamic type's version
- [ ] Example: `Circle` overrides `Shape`'s pure virtual `area`, so `area()` through a `Shape&` runs the circle's
- [ ] Obligation: the base needs a virtual destructor, or deleting through a base pointer is undefined behaviour
- [ ] Pitfall: passing a `Shape` by value slices off the derived part, so the base version runs
