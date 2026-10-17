---
id: life-explain-lifetimes
kind: explain
version: 1
level: 2
tags: [lifetime, constructors, destructors]
requires:
  - life-why-reverse
  - cpp-essentials/life-copy-which-runs
  - cpp-essentials/life-temporary-full-expression
  - cpp-essentials/life-new-outlives-scope
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://en.cppreference.com/w/cpp/language/storage_duration
---
A newcomer asks: when does C++ run an object's constructor, and when its destructor? Explain.
---
- [ ] A local is constructed at its declaration and destroyed when control leaves its enclosing block, by any route (`}`, `return`, `break`, exception)
- [ ] Locals and members are destroyed in reverse order of construction, so anything an object was built from is still alive when it dies
- [ ] Creating a new object from an existing one (`T b = a;`, a by-value parameter) runs the copy constructor, not copy assignment
- [ ] A temporary is destroyed at the end of the full-expression that created it, i.e. at the statement's `;`
- [ ] An object made with `new` belongs to no scope: it is destroyed only when a matching `delete` runs
