---
id: vc-explain-value-categories
kind: explain
version: 1
level: 3
tags: [value-categories, references, temporaries]
requires:
  - vc-classify-cloze
  - vc-const-ref-param-code
  - vc-param-binding-no-extension
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://en.cppreference.com/w/cpp/language/reference_initialization
elaborate: Say which of your own functions take a `T&` that a caller might want to pass a temporary to, and what you would change.
---

An interviewer asks what "lvalue" and "rvalue" mean in C++ and why a
working programmer should care. Answer them.

---

- [ ] An expression is an lvalue when it names an object whose address `&` can take
- [ ] An rvalue is a temporary value, such as `n++`, which yields a copy of the old value, not `n`
- [ ] The category decides what a reference may bind: a lasting object or a temporary about to die
- [ ] A plain `T&` parameter rejects temporaries, so read-only parameters take `const T&`
- [ ] A temporary bound to a parameter dies at the call's `;`, so returning that reference dangles
