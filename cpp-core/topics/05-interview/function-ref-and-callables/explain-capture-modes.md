---
id: callables-explain-capture-modes
kind: explain
version: 1
level: 3
tags: [callables, lambdas]
requires:
  - cpp-essentials/lambda-mutable
  - lambda-init-capture
elaborate: Which capture would you choose for a callback that runs after the enclosing function has returned, and why?
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---
A reviewer asks what each kind of capture in a lambda expression puts inside
the closure object. Explain it to them.
---
- [ ] `[n]` copies `n` into a member when the closure object is created; later changes to `n` are invisible
- [ ] `[&n]` stores a reference: every call reads `n`'s current value, and nothing keeps `n` alive
- [ ] `[&]` captures by reference every local the body uses, so calls change the caller's own variables
- [ ] The call operator is `const`, so changing a copy capture needs `mutable`, which changes only the closure's copy
- [ ] An init-capture `[p = std::move(p)]` declares a new member from any expression, so a `unique_ptr` can move in
