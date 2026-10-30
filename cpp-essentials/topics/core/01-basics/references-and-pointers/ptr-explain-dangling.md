---
id: ptr-explain-dangling
kind: explain
version: 2
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

- [ ] A reference or pointer never keeps its object alive; it dangles once that object's lifetime ends
- [ ] Returning a pointer or reference to a local dangles, because the local dies when the function returns
- [ ] After `delete p`, `p` and every copy of it dangle; reading or deleting through them is undefined
- [ ] A temporary dies at the end of the full-expression that created it, the `;`
- [ ] A `const` reference bound directly to a temporary extends it; one bound to a function's returned reference does not
