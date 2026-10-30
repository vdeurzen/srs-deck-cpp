---
id: move-semantics-explain-mechanism
kind: explain
version: 2
level: 3
tags: [move-semantics]
requires:
  - value-categories-std-move-cloze
  - raii-move-steals-handle
  - move-semantics-moved-from-state
  - move-vs-copy-intro
elaborate: Which type in your own code owns a resource, and what would its move constructor take from the source?
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
  - https://en.cppreference.com/w/cpp/language/move_assignment
  - https://en.cppreference.com/w/cpp/utility/move
---
Explain to a colleague, in about a minute, what a move is in C++.
---
- [ ] Copying a resource-owning object duplicates its resource, although the source is about to be discarded
- [ ] A move transfers it instead: the move constructor takes the handle and sets the source's to "owns nothing"
- [ ] No element is copied, only the handle changes hands, so a move costs the same whatever the size
- [ ] `std::move` only casts to an rvalue, so overload resolution picks the move constructor
- [ ] The source is left valid but unspecified, so only assign to it or destroy it
