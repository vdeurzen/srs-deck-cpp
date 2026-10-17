---
id: callables-explain-capture-lifetime
kind: explain
version: 1
level: 4
tags: [callables, lambdas, lifetime]
requires:
  - lambda-this-capture
  - smart-pointers-weak-ptr-lock
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://wg21.link/p0806
---
A lambda written inside a function will be called after that function
returns. Explain which captures can dangle there, and how to capture so
the callback is safe.
---
- [ ] A by-reference capture is valid only while the referent lives; calling the closure after the variable's scope has ended is undefined behaviour, because a capture extends no lifetime
- [ ] The closure outlives its scope when it is returned, stored (a member, a container, a `std::function`), or posted to another thread or queue: those are the captures to audit
- [ ] Inside a member function, `[=]` captures `this` (a pointer), not the members, so member reads dangle once the object dies
- [ ] `[*this]` or an init-capture such as `[m = m]` copies the data, so the closure owns what it reads
- [ ] When the callback needs the owner itself, capture a `shared_ptr` to keep it alive, or a `weak_ptr` and `lock()` it in the body to skip the work if the owner is gone
