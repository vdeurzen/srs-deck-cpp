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
- [ ] `return std::move(local);` disables NRVO: a local returned by name is already treated as an rvalue and may be built in place; the cast forces a move where elision would have cost nothing
- [ ] A by-value or `Widget&&` parameter returned by name is implicitly moved too (C++20 P1825, C++23 P2266), so `std::move` there is redundant; it is needed for a subobject of a local (`return std::move(p.first);`), and a forwarding reference needs `std::forward<T>`
- [ ] `T&&` with `T` deduced is a forwarding reference: for an lvalue argument `T` is `U&`, so `std::move(x)` would move the caller's lvalue out from under it
- [ ] `std::forward<T>(x)` uses the deduced `T` to restore the caller's value category: an rvalue stays an rvalue, an lvalue stays an lvalue
- [ ] `std::vector` reallocates with `std::move_if_noexcept`: a copyable type whose move constructor is not `noexcept` is copied to keep `push_back`'s strong guarantee; mark the move `noexcept` (a defaulted one inherits a throwing member's specification)
