---
id: smf-explain-generated
kind: explain
version: 1
level: 4
tags: [classes, special-members, interview]
requires:
  - smf-point-no-arg
  - smf-grid-one-declaration
  - smf-frame-defaulted-dtor
  - smf-order-two-lines
  - life-unique-ptr-member-no-copy
elaborate: Pick a class of yours that declares a destructor; say which special members it now has, and which line you would add or remove.
refs:
  - https://en.cppreference.com/w/cpp/language/rule_of_three
  - https://eel.is/c++draft/class.default.ctor#1
  - https://eel.is/c++draft/class.copy.ctor#6
  - https://eel.is/c++draft/class.copy.ctor#8
  - https://eel.is/c++draft/class.copy.assign#7
  - https://howardhinnant.github.io/classdecl.html
---
An interviewer asks: when does the compiler write a class's special member
functions for you, and when doesn't it? Answer them.
---
- [ ] The default constructor is written only if the class declares no constructor at all, a copy constructor included
- [ ] Copy constructor and copy assignment are written unless a move operation is declared; then they are deleted
- [ ] Move operations are written only if no copy operation, destructor or other move is declared; otherwise moves silently copy
- [ ] Writing `= default` still counts as declaring it, so a defaulted destructor also suppresses the moves
- [ ] A written operation is deleted when a member cannot do it: a `unique_ptr` cannot copy, a `const` member cannot be assigned
