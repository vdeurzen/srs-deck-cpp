---
id: life-explain-copies
kind: explain
version: 1
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

- [ ] Problem: C++ class objects are values, so a copy must build or overwrite a whole object
- [ ] Mechanism: initialising a new object from another runs the copy constructor, never copy assignment
- [ ] Example: passing an object by value runs the copy constructor, though no `=` appears
- [ ] Cost: each by-value parameter or copy-initialisation builds a full new object, copying every member
- [ ] Pitfall: a raw owning pointer is copied shallowly, so both destructors `delete[]` the same array
