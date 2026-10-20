---
id: raii-explain-owning-type
kind: explain
version: 2
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
- [ ] Problem: a raw handle leaks when an early return or exception skips the one `fclose`
- [ ] Mechanism: the destructor is the single release point, run on every path out of scope
- [ ] Example: a local guard built from `fopen` closes the file however the function exits
- [ ] Trade-off: copying is deleted, so the type is move-only and one handle never has two owners
- [ ] Pitfall: a moved-from guard must own nothing, or both destructors `fclose` the same handle
