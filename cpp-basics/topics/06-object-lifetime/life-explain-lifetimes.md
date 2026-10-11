---
id: life-explain-lifetimes
kind: explain
version: 1
level: 2
tags: [lifetime, constructors, destructors]
requires:
  - life-why-reverse
  - life-copy-which-runs
  - life-temporary-full-expression
  - life-new-outlives-scope
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://en.cppreference.com/w/cpp/language/storage_duration
---
A newcomer asks when C++ runs an object's constructor and destructor. Answer for locals, copies, temporaries and objects made with `new`.
---
- [ ] A local is constructed at its declaration and destroyed when control leaves its enclosing block, by any route (`}`, `return`, `break`, exception)
- [ ] Locals and members are destroyed in reverse order of construction, so anything an object was built from is still alive when it dies
- [ ] Creating a new object from an existing one (`T b = a;`, a by-value parameter) runs the copy constructor, not copy assignment
- [ ] A temporary is destroyed at the end of the full-expression that created it, i.e. at the statement's `;`
- [ ] An object made with `new` belongs to no scope: it is destroyed only when a matching `delete` runs
