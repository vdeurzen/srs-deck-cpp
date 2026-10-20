---
id: value-categories-explain-taxonomy
kind: explain
version: 1
level: 3
tags: [value-categories, move-semantics]
requires:
  - value-categories-taxonomy
  - value-categories-std-move-cloze
  - value-categories-prvalue-no-copy
  - value-categories-overload-binding
refs:
  - https://en.cppreference.com/w/cpp/language/value_category#Primary_categories
  - https://en.cppreference.com/w/cpp/utility/move
  - https://en.cppreference.com/w/cpp/language/copy_elision
elaborate: Find a `std::move` in your own code; say what its result's value category is, and which overload it selects.
---

An interviewer asks what an xvalue is and why C++ needs that category at
all. Answer them.

---

- [ ] Problem: overloads must tell an object still in use from one whose contents may be taken
- [ ] Mechanism: an xvalue has identity yet may be moved from, so it is both glvalue and rvalue
- [ ] Example: `std::move(x)` moves nothing; its result is an xvalue naming `x`
- [ ] Contrast: a prvalue has no identity; it initialises its target directly, so nothing is moved
- [ ] Pitfall: naming an rvalue-reference parameter gives an lvalue expression, so passing it on picks the `const T&` overload
