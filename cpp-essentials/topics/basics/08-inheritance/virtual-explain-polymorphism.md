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
refs:
  - https://en.cppreference.com/w/cpp/language/virtual
  - https://en.cppreference.com/w/cpp/language/abstract_class
---
A newcomer wants a function that takes "any shape" and runs each kind of shape's own code. Explain what to write in the base class, in each derived class, and at the call site.
---
- [ ] Declare the customisable function `virtual` in the base, so a call through a `Shape&` or `Shape*` runs the version of the object's dynamic type
- [ ] Where the base has no sensible version, make the function pure (`= 0`): the base becomes abstract, and every concrete derived class must override it
- [ ] Mark each derived version `override`, so a mismatch in parameters or `const` is a compile error instead of a silent new function
- [ ] Give the base a virtual destructor, because deleting a derived object through a base pointer without one is undefined behaviour
- [ ] Pass and store objects by reference or pointer: copying into a base-class value slices off the derived part, and its calls run the base version
