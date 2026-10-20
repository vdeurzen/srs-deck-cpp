---
id: ptr-explain-dangling
kind: explain
version: 1
level: 3
tags: [references, pointers, lifetime]
requires:
  - ptr-dangling
  - ptr-temporary-full-expression
  - ptr-lifetime-extension
  - ptr-ref-extension-trap
refs:
  - https://en.cppreference.com/w/cpp/language/reference#Dangling_references
  - https://en.cppreference.com/w/cpp/language/reference_initialization#Lifetime_of_a_temporary
elaborate: Name a function in your code that returns a reference or pointer; whose object does it point into, and who keeps that alive?
---

A teammate new to C++ asks when a reference or pointer stops being safe
to use. Explain.

---

- [ ] Problem: a reference or pointer never keeps its object alive; it dangles once that object's lifetime ends
- [ ] Mechanism: a temporary dies at the end of the full-expression that created it, the `;`
- [ ] Example: a `const` reference bound directly to a temporary extends it; one a function returns does not
- [ ] Cost: going through a dangling pointer is undefined behaviour that no check of its value detects
- [ ] Contrast: a pointer to a deleted object, or to an ended local, dangles the same way
