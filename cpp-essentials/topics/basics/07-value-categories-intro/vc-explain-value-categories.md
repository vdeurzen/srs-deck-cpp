---
id: vc-explain-value-categories
kind: explain
version: 1
level: 3
tags: [value-categories, references, temporaries]
requires:
  - vc-rvalue-ref-binds-temporaries
  - vc-plain-ref-rejects-temporary
  - vc-classify-cloze
refs:
  - https://en.cppreference.com/w/cpp/language/value_category
  - https://en.cppreference.com/w/cpp/language/reference_initialization
elaborate: Recall a compiler error that mentioned an lvalue or rvalue; which expression had the wrong category, and how did you change it?
---

An interviewer asks what "lvalue" and "rvalue" mean in C++ and why a
working programmer should care. Answer them.

---

- [ ] An lvalue is an expression naming an object with identity, so `&` can take its address
- [ ] An rvalue only yields a value, such as `n + 1` or `n++`, with no lasting object to point at
- [ ] The category explains compile errors: `&(n + 1)` is rejected because `n + 1` is not an lvalue
- [ ] The category warns about lifetime: a temporary dies at its statement's end, so a pointer kept past it dangles
- [ ] The category shows what may be moved: a temporary won't be used again, so its contents can be taken
