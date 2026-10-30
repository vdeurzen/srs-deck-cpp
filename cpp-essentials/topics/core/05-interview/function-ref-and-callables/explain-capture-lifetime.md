---
id: callables-explain-capture-lifetime
kind: explain
version: 1
level: 4
tags: [callables, lambdas, lifetime]
requires:
  - lambda-this-capture
  - lambda-amp-capture-intro
  - lambda-store-std-function
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://wg21.link/p0806
elaborate: Which callback in your current code runs after the function that created it returns, and what does it capture?
---
A lambda expression inside a function yields a closure object that is
called after that function returns. Explain to a code reviewer when its captures are safe.
---
- [ ] The closure object stores each capture as a member: `[&x]` a reference, `[x]` a copy
- [ ] A copy capture is safe after the function returns: a snapshot that costs a copy
- [ ] A by-reference capture dangles once the captured variable's scope ends
- [ ] So a closure kept in a `std::function`, holding a `&` capture of a local, later reads a dead local
- [ ] Inside a member function `[=]` copies `this`, not the members, so member reads can dangle
