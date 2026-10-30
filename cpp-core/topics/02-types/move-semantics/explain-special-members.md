---
id: move-semantics-explain-special-members
kind: explain
version: 2
level: 3
tags: [move-semantics, special-members]
requires:
  - cpp-essentials/move-semantics-implicit-move-suppressed
  - cpp-essentials/move-semantics-const-member-copies
  - cpp-essentials/class-rule-of-zero
elaborate: When would you still write a destructor and all four copy and move operations yourself?
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
---
A colleague asks when a class gets a move constructor it never wrote. Explain it to them.
---
- [ ] A user-declared destructor, copy constructor, copy assignment or move assignment suppresses the implicit move constructor
- [ ] Then `std::move(x)` still compiles: the xvalue binds `const T&`, and the copy constructor runs silently
- [ ] Writing `T(T&&) = default;` brings the member-wise move back
- [ ] Even that move copies a `const` member, because a `const` xvalue binds only the copy constructor
- [ ] Holding resources in `std::vector`, `std::string` or `std::unique_ptr` members needs no destructor, so the implicit move stays
