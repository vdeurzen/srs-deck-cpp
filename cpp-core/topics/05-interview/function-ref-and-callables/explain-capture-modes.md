---
id: callables-explain-capture-modes
kind: explain
version: 1
level: 3
tags: [callables, lambdas]
requires:
  - lambda-mutable
  - lambda-init-capture
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
---
A review comment asks what `[n]`, `[&n]`, `[=]`, `[&]` and
`[p = std::move(p)]` each put inside the closure object. Explain what a
capture stores, and when.
---
- [ ] `[n]` copies `n` into a closure member when the lambda is *created*; later changes to `n` are invisible to it
- [ ] `[&n]` stores a reference: every call reads `n`'s current value, and the closure does nothing to keep `n` alive
- [ ] `[=]` and `[&]` are capture-defaults: they capture only the variables the body actually names, by copy or by reference respectively
- [ ] The call operator is `const` by default, so modifying a by-copy capture needs `mutable`, which changes the closure's copy, never the original
- [ ] An init-capture `[p = std::move(p)]` declares a new member initialised from any expression, which is how a move-only object such as a `unique_ptr` gets inside
