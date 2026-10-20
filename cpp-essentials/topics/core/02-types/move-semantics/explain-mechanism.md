---
id: move-semantics-explain-mechanism
kind: explain
version: 1
level: 3
tags: [move-semantics]
requires:
  - value-categories-std-move-cloze
  - raii-move-steals-handle
  - move-semantics-moved-from-state
  - vc-named-rvalue-ref-is-lvalue
elaborate: Which type in your own code owns a resource, and what would its move constructor take from the source?
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
  - https://en.cppreference.com/w/cpp/language/move_assignment
  - https://en.cppreference.com/w/cpp/utility/move
---
Explain to a colleague, in about a minute, what a move is in C++.
---
- [ ] Problem: copying a resource-owning object duplicates its resource, although the source is about to be discarded
- [ ] Mechanism: `std::move` only casts to an rvalue, so overload resolution picks the move constructor
- [ ] Example: a handle owner's move constructor takes the handle and sets the source's to "owns nothing"
- [ ] Cost: the source is left valid but unspecified, so only assign to it or destroy it
- [ ] Pitfall: naming a `T&& x` parameter gives an lvalue expression, so passing it on as a move needs another `std::move`
