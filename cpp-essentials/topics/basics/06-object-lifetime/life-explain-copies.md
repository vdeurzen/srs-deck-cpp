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

- [ ] A copy either builds a new object or overwrites an existing one, and each runs its own function
- [ ] Initialising a new object from another runs the copy constructor, never copy assignment
- [ ] Passing an object by value runs the copy constructor too, though no `=` appears
- [ ] Unless you write one, the copy the compiler writes copies every member in turn
- [ ] So a raw owning pointer is copied shallowly, and both destructors `delete[]` the same array
