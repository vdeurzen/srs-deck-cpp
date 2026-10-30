---
id: move-semantics-explain-forward-not-move
kind: explain
version: 1
level: 4
tags: [move-semantics, templates]
requires:
  - move-semantics-perfect-forwarding
  - move-semantics-moved-from-state
  - move-semantics-forward-intro
elaborate: Say in one sentence how you decide, reading a template, whether a `&&` parameter should be passed on with `std::move` or `std::forward`.
refs:
  - https://en.cppreference.com/w/cpp/utility/forward
  - https://en.cppreference.com/w/cpp/language/reference#Forwarding_references
---
In a code review you find `template<class T> void f(T&& x)` whose body
passes `x` on as `inner(std::move(x));`. Explain to the author, aloud, what
goes wrong and what to write instead.
---
- [ ] With `T` deduced, `T&&` is a forwarding reference, binding lvalues and rvalues alike
- [ ] So the wrapper must pass `x` on exactly as the caller gave it, lvalue or rvalue
- [ ] `std::move(x)` moves a caller's lvalue out from under it, leaving it valid but unspecified
- [ ] Write `std::forward<T>(x)` instead: it passes `x` on with the caller's value category
- [ ] `std::forward<T>(x)` is only a cast, so forwarding itself copies and moves nothing
