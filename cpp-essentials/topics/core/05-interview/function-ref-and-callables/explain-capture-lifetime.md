---
id: callables-explain-capture-lifetime
kind: explain
version: 1
level: 4
tags: [callables, lambdas, lifetime]
requires:
  - lambda-this-capture
  - smart-pointers-weak-ptr-lock
  - lambda-store-std-function
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://wg21.link/p0806
elaborate: Which callback in your current code runs after the function that created it returns, and what does it capture?
---
A lambda written inside a function will be called after that function
returns. Explain to a code reviewer when its captures are safe.
---
- [ ] Problem: a by-reference capture dangles once the captured variable's scope ends
- [ ] Mechanism: the closure stores each capture as a member: `[&x]` a reference, `[x]` a copy
- [ ] Example: a lambda stored in a `std::function` that captured a local by `&` later reads a dead local
- [ ] Trade-off: capture a `weak_ptr` and `lock()` it, so the callback skips a destroyed object
- [ ] Pitfall: inside a member function `[=]` copies `this`, not the members, so member reads dangle
