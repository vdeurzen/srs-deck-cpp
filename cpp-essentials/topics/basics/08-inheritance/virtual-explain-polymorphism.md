---
id: virtual-explain-polymorphism
kind: explain
version: 2
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
  - https://en.cppreference.com/w/cpp/language/override
---
A newcomer wants one function that takes "any shape" and runs each kind
of shape's own code. Explain to them how C++ does this.
---
- [ ] Declare `area` `virtual` in `Shape`; a call through `Shape&` or `Shape*` runs the object's dynamic type's version
- [ ] Making it pure virtual, `= 0`, forces each derived shape such as `Circle` to supply its own
- [ ] Marking a derived version `override` turns a mismatched signature into a compile error, not a silent new function
- [ ] The base needs a virtual destructor, or deleting through a base pointer is undefined behaviour
- [ ] Passing a `Shape` by value slices off the derived part, so the base version runs
