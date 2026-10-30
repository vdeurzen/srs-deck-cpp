---
id: value-categories-explain-taxonomy
kind: explain
version: 2
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
elaborate: Find a `std::move` in your own code; say what its result's value category is, and which overload it selects.
---

An interviewer asks what an xvalue is and why C++ needs that category at
all. Answer them.

---

- [ ] An xvalue has identity yet may be moved from, so it is both a glvalue and an rvalue
- [ ] C++ needs it so overloads can tell an object still in use from one whose contents may be taken
- [ ] `std::move(x)` moves nothing: it is a cast to `T&&` whose result is an xvalue naming `x`
- [ ] Overload resolution binds an xvalue to `T&&` before `const T&`, so the move constructor is chosen
- [ ] Without it, naming an object always gives an lvalue, so that object could only be copied
