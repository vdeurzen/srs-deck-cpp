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
elaborate: Which object in your own code is destroyed on an early `return` or exception path you rarely test?
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://en.cppreference.com/w/cpp/language/storage_duration
---
A newcomer asks when C++ runs an object's constructor and destructor. What do you tell them?
---
- [ ] A local is constructed at its declaration and destroyed when control leaves its block, by any route
- [ ] Locals are destroyed in reverse order of construction, so whatever an object was built from outlives it
- [ ] Creating an object from an existing one (`T b = a;`, a by-value parameter) runs the copy constructor, not assignment
- [ ] A temporary is destroyed at the end of the full-expression that created it, i.e. at the statement's `;`
- [ ] An object made with `new` belongs to no scope: it is destroyed only when a matching `delete` runs
