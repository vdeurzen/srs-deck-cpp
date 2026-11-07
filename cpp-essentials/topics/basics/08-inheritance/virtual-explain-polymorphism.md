---
id: virtual-explain-polymorphism
kind: explain
version: 2
level: 2
tags: [inheritance, virtual, dispatch]
requires:
  - virtual-slice-parameter
elaborate: Say where in a codebase you know a `virtual` interface is used, and what the alternative without it would look like.
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/language/abstract_class
  - https://en.cppreference.com/w/cpp/language/override
---
A newcomer wants one function that takes "any shape" and runs each kind
of shape's own code. Explain to them how C++ does this.
---
- [ ] Declare `area` `virtual` in `Shape` and override it in each derived shape
- [ ] A function taking `Shape&` accepts any derived shape, and a call runs the object's dynamic type's version
- [ ] Passing a `Shape` by value slices off the derived part and runs the base version, so take a reference
