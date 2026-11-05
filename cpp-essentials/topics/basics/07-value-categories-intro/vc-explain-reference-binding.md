---
id: vc-explain-reference-binding
kind: explain
version: 1
level: 3
tags: [value-categories, references, parameters]
requires:
  - vc-const-ref-param-code
refs:
  - https://en.cppreference.com/w/cpp/language/reference_initialization
  - https://en.cppreference.com/w/cpp/language/value_category
elaborate: Say which of your own functions take a `T&` that a caller might want to pass a temporary to, and what you would change.
---

An interviewer asks which arguments a parameter of type `T&`, `const T&`
or `T&&` accepts. Answer them.

---

- [ ] `T&` accepts only lvalues, so passing a temporary is a compile error
- [ ] `const T&` accepts lvalues and temporaries alike without a copy, so read-only parameters usually take it
- [ ] `T&&` accepts only rvalues, so passing a named variable is a compile error
- [ ] (empty: tick this)
- [ ] (empty: tick this)
