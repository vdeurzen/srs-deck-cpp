---
id: life-explain-when-objects-die
kind: explain
version: 1
level: 3
tags: [lifetime, destructors, storage-duration]
requires:
  - life-ctor-dtor-count
  - life-new-outlives-scope
  - life-delete-matches-new
  - life-temporary-full-expression
refs:
  - https://en.cppreference.com/w/cpp/language/lifetime
  - https://en.cppreference.com/w/cpp/language/storage_duration
  - https://en.cppreference.com/w/cpp/language/destructor
elaborate: Pick an object in your own code that holds a file or a buffer; say at which exact line it is destroyed.
---

A Go teammate asks: with no garbage collector, when does a C++ object
actually go away? Answer them.

---

- [ ] Problem: nothing collects unused objects, so how an object was created fixes when it ends
- [ ] Mechanism: a local dies at the closing brace of its block, on every path out, running its destructor
- [ ] Example: an object declared in a loop body is built and destroyed again on every iteration
- [ ] Cost: an object from `new` lives on until a matching `delete`, which code must remember to run
- [ ] Pitfall: an unnamed temporary dies at the end of its full-expression, the `;`, not at the brace
