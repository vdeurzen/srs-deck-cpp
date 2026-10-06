---
id: raii-explain-owning-type
kind: explain
version: 1
level: 3
tags: [raii, lifetime, special-members]
requires:
  - raii-guard-destructor
  - raii-copy-double-close
  - raii-move-steals-handle
  - raii-ctor-throw-unwinds-members
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/rule_of_three
---
From memory, design a type that owns one `std::FILE*` (or any handle with a close function). Name each member you write and the bug it prevents.
---
- [ ] The constructor takes the handle, so acquisition *is* initialisation: there is no window in which the handle exists but nothing owns it
- [ ] The destructor is the single release point: it checks for null, calls `fclose`, and never throws, because it runs during unwinding
- [ ] Copy constructor and copy assignment are deleted: a shallow copy would mean two destructors closing one handle
- [ ] The move constructor steals the handle and nulls the source (`std::exchange`), so a moved-from guard releases nothing
- [ ] One resource per owner: if a constructor acquiring two handles throws between them only fully constructed *members* are destroyed, so each handle lives in its own member
