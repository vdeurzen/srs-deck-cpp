---
id: move-semantics-rule-of-five
kind: basic
version: 1
level: 2
tags: [move-semantics, special-members]
requires:
  - raii-copy-double-close
  - raii-move-steals-handle
elaborate: Which of your own classes declares a destructor, and what member type would let it declare none of the five?
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---

## `Buffer` writes its own destructor to `delete[]` a raw array. Which other special members does the Rule of Five say it must write too?

---

**All four: copy constructor, copy assignment, move constructor, move
assignment.** The compiler's defaults copy the pointer member-wise, so a
copy double-frees and a "move" is a copy. A destructor that releases a
resource means every way the object is duplicated or replaced must say
what happens to that resource. One question, five answers.
