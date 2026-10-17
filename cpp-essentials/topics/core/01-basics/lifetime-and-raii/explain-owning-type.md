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
From memory, design a type that owns one `std::FILE*` (or any handle with a close function). Name each member you write and the bug it prevents, then say what changes if the type must own two handles.
---
- [ ] The constructor takes the handle, so acquisition *is* initialisation: there is no window in which the handle exists but nothing owns it
- [ ] The destructor is the single release point and must not throw, because it runs during unwinding
- [ ] Copy constructor and copy assignment are deleted: a shallow copy would mean two destructors closing one handle
- [ ] Moves steal the handle and null the source (`std::exchange`); the destructor skips a null handle, so a moved-from owner releases nothing
- [ ] Two handles: each lives in its own owning member, so if acquiring the second throws, unwinding still releases the first
