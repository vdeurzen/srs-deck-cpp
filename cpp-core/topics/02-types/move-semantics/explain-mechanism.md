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
- [ ] `T&&` is an rvalue reference type; `std::move(x)` is a cast of `x` to an xvalue and moves nothing itself — the move constructor or move assignment that overload resolution then selects does the work
- [ ] A move constructor steals the handle and leaves the source owning nothing (`std::exchange`), so exactly one destructor releases the resource
- [ ] Moved-from standard types are valid but unspecified: invariants hold, so destroy, assign, `empty()` and `clear()` are fine, while `front()` or `pop_back()` need their precondition re-established first
- [ ] A named `T&& x` — a move-constructor or rvalue-reference parameter — is itself an lvalue, so passing it on as a move needs another `std::move`; its declared type does not travel with its name
