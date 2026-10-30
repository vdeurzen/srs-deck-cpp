---
id: lambda-explain-closures
kind: explain
version: 2
level: 3
tags: [lambdas, callables]
requires:
  - lambda-closure-type
  - lambda-capture-trace
  - lambda-store-std-function
  - lambda-dangling-reference
refs:
  - https://en.cppreference.com/w/cpp/language/lambda#Closure_type
  - https://en.cppreference.com/w/cpp/language/lambda#Lambda_capture
  - https://en.cppreference.com/w/cpp/utility/functional/function
elaborate: Pick a callback in your own code; say what its closure object holds, and whether anything it captured can die first.
---

An interviewer asks what a C++ lambda expression really creates. Explain it to them.

---

- [ ] It creates an object of a unique, unnamed class the compiler writes: the closure object
- [ ] Each capture becomes a data member of that class, and the body becomes its `operator()`
- [ ] `[n]` copies `n` when the lambda expression is evaluated, so later changes to `n` go unseen
- [ ] Closure objects of different types stored together need `std::function`, which may allocate on the heap
- [ ] A reference capture extends no lifetime, so returning such a closure from a function dangles
