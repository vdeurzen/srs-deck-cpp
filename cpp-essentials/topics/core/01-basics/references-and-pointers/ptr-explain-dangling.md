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

A Go teammate is used to the garbage collector keeping alive whatever a
pointer refers to. Explain to them when a C++ reference or pointer stops
being safe to use.

---

- [ ] Problem: a reference or pointer never keeps its object alive; it dangles once that object's lifetime ends
- [ ] Mechanism: a temporary dies at the end of the full-expression that created it, the `;`
- [ ] Example: a `const` reference bound directly to a temporary keeps it alive as long as the reference
- [ ] Trade-off: only direct binding extends; a reference a function returns into a temporary dangles
- [ ] Pitfall: going through a dangling pointer is undefined behaviour that no check of its value detects
