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
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
  - https://en.cppreference.com/w/cpp/utility/move
---
Explain to a colleague what a move is in C++: what `std::move` does,
what a move constructor does, and what the source is afterwards.
---
- [ ] Motivation: copying a resource-owning type duplicates the resource; when the source is about to be discarded, transferring its handle is enough
- [ ] `std::move(x)` is only a cast of `x` to an xvalue (an rvalue reference); it moves nothing itself
- [ ] Overload resolution then selects the move constructor or move assignment, which steals the handle and leaves the source owning nothing, so exactly one destructor releases it
- [ ] Moved-from standard types are valid but unspecified: only operations without preconditions (destroy, assign, `clear()`) are safe until a value is set again
- [ ] A named `T&& x` parameter is itself an lvalue, so passing it on as a move needs another `std::move`
