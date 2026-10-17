---
id: move-semantics-explain-lost-moves
kind: explain
version: 1
level: 4
tags: [move-semantics]
requires:
  - move-semantics-return-std-move
  - move-semantics-perfect-forwarding
  - move-semantics-vector-move-if-noexcept
refs:
  - https://en.cppreference.com/w/cpp/language/copy_elision
  - https://en.cppreference.com/w/cpp/utility/forward
  - https://en.cppreference.com/w/cpp/utility/move_if_noexcept
---
A code review turns up `return std::move(local);`, a `std::move` inside
`template<class T> void f(T&& x)`, and a `std::vector` that copies on
every reallocation. Explain what each one costs and the fix.
---
- [ ] `return std::move(local);` disables NRVO: the cast makes the operand no longer a plain name, so a move is forced where the object could have been built in place for free
- [ ] Fix: `return local;` — a local returned by name is elided or, failing that, implicitly treated as an rvalue, so nothing is copied
- [ ] `T&&` with `T` deduced is a forwarding reference: for an lvalue argument `T` is `U&`, so `std::move(x)` moves the caller's lvalue out from under it
- [ ] Fix: `std::forward<T>(x)` uses the deduced `T` to keep the caller's value category: an rvalue stays an rvalue, an lvalue stays an lvalue
- [ ] `std::vector` reallocates with `std::move_if_noexcept`, so an element whose move constructor is not `noexcept` is copied; fix: mark the move constructor `noexcept`
