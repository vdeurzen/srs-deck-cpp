---
id: life-explain-copies
kind: explain
version: 2
level: 3
tags: [lifetime, copy, special-members]
requires:
  - life-copy-which-runs
  - life-shallow-copy-pointer
refs:
  - https://en.cppreference.com/w/cpp/language/copy_constructor
  - https://en.cppreference.com/w/cpp/language/copy_assignment
elaborate: Find a class of yours with a pointer member; say what its compiler-written copy would do, and whether that is safe.
---

A new colleague asks what actually runs when C++ code copies an object
of a class you wrote. Explain it to them.

---

- [ ] Initialising a new object from another runs the copy constructor, never copy assignment
- [ ] Passing an object by value runs the copy constructor, though no `=` appears
- [ ] `=` on an object that already exists runs copy assignment
- [ ] Unless you write one, the compiler-written copy copies every member in turn
- [ ] A compiler-written copy of a raw pointer member copies the address, so both objects point at the same data
