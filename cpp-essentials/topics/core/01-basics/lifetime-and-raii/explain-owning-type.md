---
id: raii-explain-owning-type
kind: explain
version: 3
level: 3
tags: [raii, lifetime, special-members]
requires:
  - raii-guard-destructor
  - raii-copy-double-close
  - raii-move-steals-handle
refs:
  - https://en.cppreference.com/w/cpp/language/raii
  - https://en.cppreference.com/w/cpp/language/rule_of_three
elaborate: Which handle in your current code (a socket, a lock, a mapped file) has no owner type yet, and what would you call it?
---
At a whiteboard, an interviewer asks you to design, from memory, a type
that owns one `std::FILE*`. Talk them through it.
---
- [ ] A raw handle leaks when an early return or exception skips the one `fclose`
- [ ] The constructor takes the handle from `fopen` and stores it, so owning begins at construction
- [ ] The destructor calls `fclose`: the single release point, run on every path out of scope
- [ ] Copying is deleted, so the type is move-only and one handle never has two owners
- [ ] A move must leave the source owning nothing, or both destructors `fclose` the same handle
