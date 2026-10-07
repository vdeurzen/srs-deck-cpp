---
id: move-semantics-explain-special-members
kind: explain
version: 1
level: 3
tags: [move-semantics, special-members]
requires:
  - move-semantics-implicit-move-suppressed
  - move-semantics-const-member-copies
  - class-rule-of-zero
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
  - https://en.cppreference.com/w/cpp/language/move_constructor#Implicitly-declared_move_constructor
---
Explain which declarations give a class a move and which quietly take
it away. Cover the Rule of Five, the Rule of Zero and the `const` trap.
---
- [ ] Rule of Five: a user-written destructor means the class releases a resource, so copy constructor, copy assignment, move constructor and move assignment all need writing — the defaults copy the handle member-wise
- [ ] A user-declared destructor, copy constructor, copy assignment or move assignment means no move constructor is implicitly declared (and likewise for the move assignment)
- [ ] When the move is missing, `std::move(x)` still compiles: the xvalue binds `const T&` and the copy constructor runs with no warning; `= default` restores the move
- [ ] A `const` member or base is copied by the defaulted move constructor and makes the defaulted move assignment deleted
- [ ] Rule of Zero: holding the resource in a `std::unique_ptr`, `std::vector` or `std::string` member gives correct destruction, copy and move with no declarations at all
