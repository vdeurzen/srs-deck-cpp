---
id: move-semantics-explain
kind: explain
version: 1
level: 4
tags: [move-semantics]
refs:
  - https://en.cppreference.com/w/cpp/language/move_constructor
---
Explain move semantics to a senior interviewer. Cover motivation,
mechanism, and at least two pitfalls.
---
- [ ] Motivation: avoid deep-copying resource-owning types when the source is about to be discarded anyway
- [ ] `T&&` is an rvalue reference type; `std::move` is a cast to it, not a function that moves anything itself
- [ ] Moved-from state is valid but unspecified — destructible and assignable, nothing else guaranteed
- [ ] Rule of Five / Rule of Zero: a user-declared destructor suppresses the implicit move members
- [ ] Pitfall: `return std::move(x);` on a local variable can pessimise by disabling NRVO
- [ ] Pitfall: a `const` member or base blocks moving — the compiler silently falls back to copying
- [ ] Pitfall: forwarding references (`T&&` in a deduced context) are not rvalue references; `std::forward` is needed, not `std::move`
- [ ] `noexcept` on the move constructor lets `std::vector` move elements on reallocation instead of copying them
