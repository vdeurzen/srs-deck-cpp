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

- [ ] Problem: a reference must know whether it binds a lasting object or a temporary about to die
- [ ] Mechanism: an expression is an lvalue when it names an object whose address `&` can take
- [ ] Example: `n++` is a prvalue, because it yields a copy of the old value rather than `n` itself
- [ ] Trade-off: a plain `T&` parameter rejects temporaries, so read-only parameters take `const T&`
- [ ] Pitfall: a temporary bound to a parameter dies at the call's `;`, so returning that reference dangles
